import { GoogleGenAI, Type } from "@google/genai";
import { Option, Question } from "../types";

export const analyzeResults = async (
  answers: { question: Question; option: Option }[],
  totalScore: number,
  maxScore: number
) => {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    console.warn("No API Key provided");
    return {
        title: "System Offline",
        description: "The AI Neural Net is disconnected. Please configure your API Key to receive a detailed psychographic breakdown. However, based on your raw score...",
        traits: ["Data Missing", "Analysis Incomplete"]
    };
  }

  const ai = new GoogleGenAI({ apiKey });

  const promptText = `
    You are a sarcastic, cyberpunk political analyst and media critic.
    
    Task: Analyze the user's susceptibility to propaganda based on their quiz results.
    
    Data:
    Total Score: ${totalScore} / ${maxScore} (Higher score means higher susceptibility/exposure).
    
    User's specific answers:
    ${answers.map((a, i) => `${i + 1}. Q: ${a.question.text} -> A: ${a.option.text} (Bias: ${a.option.bias})`).join('\n')}
    
    Instruction:
    1. Generate a "Class Name" for this user (e.g., "Establishment Pawn", "Tinfoil Hat Warlord", "Corporate Stooge", "Enlightened Centrist", "Critical Thinker", "Doomer").
    2. Write a 2-3 sentence description roasting them slightly but offering genuine insight into their media diet.
    3. List 3 short "traits" or "inventory items" they likely possess (e.g., "Subscription to NYT", "Bunker supplies", "Apathy").
    
    Be fair. Roast the left and right equally. If they are low score, compliment their skepticism but warn them about cynicism.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: promptText,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            traits: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["title", "description", "traits"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No text returned");
    
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Analysis Failed", error);
    return {
      title: "Signal Interrupted",
      description: "We couldn't reach the AI mainframe. You're off the grid, which might be a good thing.",
      traits: ["Unknown", "Uncategorized", "Ghost in the machine"]
    };
  }
};
