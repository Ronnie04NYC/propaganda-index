import React, { useState, useEffect } from 'react';
import { QUESTIONS, MAX_SCORE, APP_URL, MOCK_LEADERBOARD } from './constants';
import { QuizState, Option, AnalysisResult, LeaderboardEntry } from './types';
import { analyzeResults } from './services/geminiService';
import { Button } from './components/Button';
import { IdentityGlyph } from './components/IdentityGlyph';

const App: React.FC = () => {
  const [state, setState] = useState<QuizState>({
    currentQuestionIndex: 0,
    answers: [],
    score: 0,
    status: 'intro'
  });

  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [copyFeedback, setCopyFeedback] = useState<'idle' | 'copied'>('idle');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(MOCK_LEADERBOARD);

  // --- LIVE TRAFFIC SIMULATOR ---
  // This effect simulates other users taking the test globally
  useEffect(() => {
    // Only run simulation if we are not currently taking the quiz to avoid distraction
    if (state.status === 'quiz') return;

    const interval = setInterval(() => {
      const simulatedTitles = [
        "Digital Dissident", "System Optimist", "Grid Defector", 
        "Narrative Conductor", "Static Noise Generator", "Blue Pill Connoisseur",
        "Legacy Media Node", "Algorithm Loyalist", "Chaos Agent", "Pattern Matcher"
      ];
      
      const rScore = Math.floor(Math.random() * MAX_SCORE);
      const levelObj = getExposureLevel(rScore);
      
      const newEntry: LeaderboardEntry = {
        id: `SUBJ-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
        timestamp: "JUST NOW",
        classification: simulatedTitles[Math.floor(Math.random() * simulatedTitles.length)],
        score: rScore,
        status: levelObj.text
      };

      setLeaderboard(prev => [newEntry, ...prev.slice(0, 8)]); // Keep recent 9 items
    }, 4500); // New scan every 4.5 seconds

    return () => clearInterval(interval);
  }, [state.status]);

  const handleStart = () => {
    setState(prev => ({ ...prev, status: 'quiz', currentQuestionIndex: 0, score: 0, answers: [] }));
  };

  const scrollToLeaderboard = () => {
    const el = document.getElementById('live-ledger');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAnswer = (option: Option) => {
    const newScore = state.score + option.score;
    const newAnswers = [...state.answers, { questionId: QUESTIONS[state.currentQuestionIndex].id, selectedOption: option }];

    if (state.currentQuestionIndex < QUESTIONS.length - 1) {
      setState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        score: newScore,
        answers: newAnswers
      }));
    } else {
      finishQuiz(newScore, newAnswers);
    }
  };

  const finishQuiz = async (finalScore: number, finalAnswers: any[]) => {
    setState(prev => ({ ...prev, status: 'analyzing', score: finalScore, answers: finalAnswers }));
    
    const formattedAnswers = finalAnswers.map((a: any) => ({
      question: QUESTIONS.find(q => q.id === a.questionId)!,
      option: a.selectedOption
    }));

    const result = await analyzeResults(formattedAnswers, finalScore, MAX_SCORE);
    setAnalysis(result);
    
    // Add User's Real Result to leaderboard
    const level = getExposureLevel(finalScore).text;
    const newEntry: LeaderboardEntry = {
      id: `SUBJ-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
      timestamp: "JUST NOW",
      classification: result.title,
      score: finalScore,
      status: level
    };
    setLeaderboard(prev => [newEntry, ...prev.slice(0, 9)]); // Keep top 10
    
    setState(prev => ({ ...prev, status: 'results' }));
  };

  const getExposureLevel = (score: number) => {
    const percentage = (score / MAX_SCORE) * 100;
    if (percentage < 20) return { text: "CRITICAL THINKER", color: "text-cyber-blue", bg: "bg-cyber-blue", border: "border-cyber-blue" };
    if (percentage < 50) return { text: "MODERATELY INFLUENCED", color: "text-cyber-yellow", bg: "bg-cyber-yellow", border: "border-cyber-yellow" };
    if (percentage < 80) return { text: "HIGHLY PROGRAMMED", color: "text-orange-500", bg: "bg-orange-500", border: "border-orange-500" };
    return { text: "MAXIMUM PROPAGANDA", color: "text-cyber-pink", bg: "bg-cyber-pink", border: "border-cyber-pink" };
  };

  const handleShare = async () => {
    if (!analysis) return;
    const level = getExposureLevel(state.score).text;
    const shareText = `PROPAGANDA EXPOSURE INDEX\n\nSCORE: ${state.score}/${MAX_SCORE}\nCLASS: ${analysis.title}\nSTATUS: ${level}\n\nTest your programming:\n${APP_URL}`;
    
    try {
      await navigator.clipboard.writeText(shareText);
      setCopyFeedback('copied');
      setTimeout(() => setCopyFeedback('idle'), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareToSocial = (platform: string) => {
    if (!analysis) return;
    const level = getExposureLevel(state.score).text;
    const text = `I scored ${state.score}/${MAX_SCORE} on the Propaganda Exposure Index.\nClass: ${analysis.title}\nStatus: ${level}`;
    const url = APP_URL;

    let link = "";
    switch(platform) {
      case 'x':
        link = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
    }
    if (link) window.open(link, '_blank', 'width=600,height=400');
  };

  return (
    <div className="min-h-screen bg-cyber-black text-cyber-green p-4 pt-8 md:p-8 md:pt-16 selection:bg-cyber-pink selection:text-white flex flex-col items-center justify-start relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyber-pink via-cyber-blue to-cyber-green"></div>
      
      <main className="w-full max-w-4xl relative z-20 flex-grow pb-20">
        
        {/* HEADER */}
        <header className="mb-4 md:mb-6 text-center select-none relative flex flex-col items-center">
          <div className="relative group mb-2 md:mb-4">
             {/* Subtle grid background for header */}
             <div className="absolute -inset-x-10 -inset-y-4 bg-[linear-gradient(90deg,rgba(0,255,65,0.1)_1px,transparent_1px),linear-gradient(rgba(0,255,65,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20 mask-image-fade-out pointer-events-none"></div>
             
             <h1 className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl font-black font-mono tracking-tighter animate-text-flow text-transparent bg-clip-text bg-gradient-to-r from-cyber-green via-white to-cyber-blue drop-shadow-[0_0_15px_rgba(0,255,65,0.4)] relative z-10 leading-[0.85] flex flex-col items-center bg-[length:200%_auto]">
              <span>PROPAGANDA</span>
              <span>EXPOSURE</span>
              <span>INDEX</span>
             </h1>
          </div>

          <div className="flex items-center justify-center gap-2 md:gap-4 whitespace-nowrap">
             <span className="hidden md:block w-8 md:w-16 h-[2px] bg-gradient-to-r from-transparent to-cyber-blue"></span>
             <p className="text-cyber-blue font-mono text-xs md:text-lg font-bold tracking-widest md:tracking-[0.25em] uppercase drop-shadow-[0_0_8px_rgba(0,217,247,0.8)]">
               Detecting Cognitive Dissonance...
             </p>
             <span className="hidden md:block w-8 md:w-16 h-[2px] bg-gradient-to-l from-transparent to-cyber-blue"></span>
          </div>
        </header>

        {/* INTRO VIEW */}
        {state.status === 'intro' && (
          <div className="bg-cyber-dark border border-cyber-green p-6 md:p-8 shadow-[0_0_15px_rgba(0,255,65,0.1)] backdrop-blur-sm relative">
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyber-green"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyber-green"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyber-green"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyber-green"></div>

            <div className="prose prose-invert font-mono mb-6 md:mb-8">
              <h2 className="text-lg md:text-xl text-cyber-pink mb-4">&gt; INITIALIZING_SEQUENCE</h2>
              <p className="mb-4 text-gray-300 text-sm md:text-base">
                The world is a stage, and the script is written by algorithms, corporations, and legacy media empires. 
                Are you a player or an NPC?
              </p>
              <p className="mb-4 text-gray-300 text-sm md:text-base">
                This diagnostic tool consists of <span className="text-cyber-yellow">14 targeted inquiries</span> designed to penetrate your ideological firewall.
                It will assess your susceptibility to narratives from both the Establishment Left, the Alt-Right, and everything in between.
              </p>
              <div className="bg-black/50 p-4 border-l-4 border-cyber-pink text-xs md:text-sm text-gray-400">
                <strong className="text-cyber-pink">WARNING:</strong> Results may cause existential dread or aggressive denial. Proceed with an open mind.
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={handleStart}>INITIATE DIAGNOSTIC</Button>
              <Button onClick={scrollToLeaderboard} variant="secondary" className="text-xs md:text-sm">VIEW LIVE LEDGER</Button>
            </div>
          </div>
        )}

        {/* QUIZ VIEW */}
        {state.status === 'quiz' && (
          <div className="w-full animate-[fadeIn_0.3s_ease-out]">
            <div className="mb-4 md:mb-6 flex justify-between items-end font-mono text-xs md:text-sm text-cyber-blue">
              <span>QUESTION {state.currentQuestionIndex + 1} / {QUESTIONS.length}</span>
              <div className="w-1/2 h-2 bg-gray-800 ml-4">
                <div 
                  className="h-full bg-cyber-pink transition-all duration-300"
                  style={{ width: `${((state.currentQuestionIndex + 1) / QUESTIONS.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-cyber-dark border border-cyber-blue p-6 md:p-10 shadow-[0_0_20px_rgba(0,217,247,0.15)] min-h-[300px] md:min-h-[400px] flex flex-col justify-between relative">
               {/* Corner accents */}
              <div className="absolute top-0 left-0 w-2 h-2 bg-cyber-blue"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-cyber-blue"></div>
              
              <h2 className="text-lg md:text-2xl font-bold mb-4 md:mb-8 leading-relaxed">
                {QUESTIONS[state.currentQuestionIndex].text}
              </h2>

              <div className="space-y-3 md:space-y-4">
                {QUESTIONS[state.currentQuestionIndex].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(option)}
                    className="w-full text-left p-3 md:p-4 border border-gray-700 hover:border-cyber-green hover:bg-cyber-green/10 transition-all duration-200 font-mono text-xs md:text-base group flex items-center"
                  >
                    <span className="mr-3 md:mr-4 text-gray-500 group-hover:text-cyber-green font-bold">&gt;</span>
                    {option.text}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ANALYZING VIEW */}
        {state.status === 'analyzing' && (
          <div className="flex flex-col items-center justify-center h-64 font-mono">
            <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-cyber-green border-t-transparent rounded-full animate-spin mb-6"></div>
            <h3 className="text-lg md:text-xl animate-pulse text-cyber-green">PROCESSING NEURAL PATTERNS</h3>
            <p className="text-xs md:text-sm text-cyber-blue mt-2">Accessing Gemini Mainframe...</p>
            <div className="mt-4 text-xs text-gray-500 w-64 text-center overflow-hidden whitespace-nowrap">
              <div className="animate-glitch">
                analyzing_bias_vectors... checking_echo_chambers...
              </div>
            </div>
          </div>
        )}

        {/* RESULTS VIEW */}
        {state.status === 'results' && analysis && (
          <div className="animate-[fadeIn_0.5s_ease-out]">
             {/* THE ID CARD */}
             <div className="bg-[#0a0a0a] border border-gray-700 p-1 relative mb-6 md:mb-8 shadow-2xl">
                {/* Card Header */}
                <div className="bg-gray-900 p-2 flex justify-between items-center border-b border-gray-700">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500 animate-pulse"></div>
                      <span className="text-[8px] md:text-[10px] font-mono text-gray-400 uppercase tracking-widest">Subject Analysis Complete</span>
                   </div>
                   <div className="text-[8px] md:text-[10px] font-mono text-gray-600">ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</div>
                </div>

                {/* Card Content */}
                <div className="p-4 md:p-8 relative overflow-hidden">
                  {/* Scanline for Card */}
                  <div className="absolute inset-0 pointer-events-none bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==')] opacity-5"></div>
                  
                  <div className="flex flex-col md:flex-row gap-6 md:gap-8 mb-6 md:mb-8 relative z-10 items-center">
                    
                    {/* GENERATIVE ART GLYPH */}
                    <div className="flex flex-col items-center md:items-start flex-shrink-0 gap-4">
                        <div className="w-24 h-24 md:w-36 md:h-36 relative">
                            {/* Seed includes specific answers to ensure uniqueness */}
                            <IdentityGlyph 
                                seed={analysis.title + state.score + JSON.stringify(state.answers)}
                                color={getExposureLevel(state.score).bg}
                                className="w-full h-full"
                            />
                            <div className="absolute -bottom-2 w-full text-center pointer-events-none">
                                <span className="text-[8px] bg-black px-2 font-mono text-gray-500 border border-gray-800">GENETIC_HASH</span>
                            </div>
                        </div>
                        {/* THE BLURB */}
                        <div className="mt-2 max-w-[180px] text-center border-t border-gray-800 pt-2">
                          <p className="text-xs text-white font-mono leading-tight">
                            Unique biometric art generated from your neural patterns.
                          </p>
                          <p className="text-[10px] text-cyber-blue mt-1 font-mono uppercase">
                            Right-click to save
                          </p>
                        </div>
                    </div>

                    {/* Classification, Score, and Status Badge */}
                    <div className="flex-1 flex flex-col justify-center pt-4 md:pt-0 md:pl-6 text-center md:text-left">
                       <div className={`inline-block self-center md:self-start px-3 py-1 border ${getExposureLevel(state.score).border} ${getExposureLevel(state.score).text} text-[10px] font-bold mb-3 uppercase tracking-wider shadow-[0_0_10px_rgba(0,0,0,0.5)]`}>
                         {getExposureLevel(state.score).text}
                       </div>
                       <h2 className="text-2xl md:text-4xl font-black text-white mb-2 uppercase leading-none tracking-tighter drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                         {analysis.title}
                       </h2>
                       <div className="font-mono text-cyber-blue text-xl md:text-2xl mb-4">
                         SCORE: <span className="text-white">{state.score}</span> / {MAX_SCORE}
                       </div>
                       
                       <div className="text-[10px] md:text-xs text-gray-500 mb-2 md:mb-3 font-mono uppercase">Detected Traits</div>
                       <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                          {analysis.traits.map((trait, i) => (
                            <span key={i} className="bg-cyber-dark text-cyber-blue px-2 py-1 md:px-3 text-[10px] md:text-xs font-mono border border-cyber-blue/30 shadow-[0_0_10px_rgba(0,217,247,0.1)]">
                              {trait}
                            </span>
                          ))}
                       </div>
                    </div>
                  </div>

                  <div className="mb-4 md:mb-6 relative z-10">
                    <p className="text-gray-300 leading-relaxed font-mono text-xs md:text-sm border-l-2 border-gray-700 pl-4 italic">
                      "{analysis.description}"
                    </p>
                  </div>
                </div>

                 {/* Card Footer */}
                <div className="bg-gray-900 p-2 border-t border-gray-700 flex justify-center items-center">
                   <div className="text-[8px] md:text-[10px] text-cyber-green font-mono">VERIFIED BY AI NEURAL NET</div>
                </div>
             </div>

             {/* ACTION CENTER */}
             <div className="grid grid-cols-1 gap-4">
                
                {/* Primary Actions */}
                <div className="flex flex-col gap-3">
                   {/* Main Copy Link Button */}
                   <Button 
                    onClick={handleShare} 
                    variant="primary"
                    className={`w-full ${copyFeedback === 'copied' ? "!bg-green-600 !text-white" : ""}`}
                   >
                    {copyFeedback === 'copied' ? "COPIED TO CLIPBOARD" : "COPY RESULTS LINK"}
                   </Button>

                   {/* Social Share Row */}
                   <div className="grid grid-cols-1 gap-1">
                      {[
                        { id: 'x', icon: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />, bg: 'hover:bg-white hover:text-black' }
                      ].map((platform) => (
                        <button
                          key={platform.id}
                          onClick={() => shareToSocial(platform.id)}
                          className={`bg-gray-900 border border-gray-700 p-3 flex items-center justify-center text-gray-400 transition-all duration-200 ${platform.bg} w-full group`}
                          title={`Share on ${platform.id.charAt(0).toUpperCase() + platform.id.slice(1)}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-bold font-mono tracking-wider">POST RESULTS TO</span>
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">{platform.icon}</svg>
                          </div>
                        </button>
                      ))}
                   </div>

                   <div className="flex gap-3 mt-1">
                      <Button onClick={() => window.location.reload()} variant="secondary" className="w-full text-xs">RETAKE</Button>
                   </div>
                </div>

             </div>
          </div>
        )}

        {/* LEADERBOARD / LIVE LEDGER */}
        <div id="live-ledger" className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] flex-grow bg-gray-800"></div>
            <h3 className="text-cyber-blue font-mono text-sm tracking-[0.2em] uppercase">Live Ledger // Recent Scans</h3>
            <div className="h-[1px] flex-grow bg-gray-800"></div>
          </div>
          
          <div className="bg-black/30 border border-gray-800 p-4 font-mono text-xs">
             <div className="grid grid-cols-12 gap-2 text-gray-500 border-b border-gray-800 pb-2 mb-2 uppercase tracking-wider text-[10px]">
                <div className="col-span-2">Time</div>
                <div className="col-span-3">Subject ID</div>
                <div className="col-span-4">Classification</div>
                <div className="col-span-3 text-right">Status</div>
             </div>
             <div className="space-y-2">
                {leaderboard.map((entry, i) => (
                  <div key={i} className={`grid grid-cols-12 gap-2 items-center p-2 border-b border-gray-800/50 hover:bg-white/5 transition-colors ${entry.timestamp === 'JUST NOW' ? 'bg-cyber-green/10 border-l-2 border-l-cyber-green' : ''}`}>
                     <div className="col-span-2 text-gray-400">{entry.timestamp}</div>
                     <div className="col-span-3 text-gray-300">{entry.id}</div>
                     <div className={`col-span-4 truncate font-bold ${entry.timestamp === 'JUST NOW' ? 'text-white' : 'text-cyber-blue'}`}>
                       {entry.classification}
                     </div>
                     <div className={`col-span-3 text-right text-[10px] ${
                       entry.status === 'CRITICAL THINKER' ? 'text-cyber-blue' :
                       entry.status === 'MODERATELY INFLUENCED' ? 'text-cyber-yellow' :
                       entry.status === 'HIGHLY PROGRAMMED' ? 'text-orange-500' :
                       'text-cyber-pink'
                     }`}>
                       {entry.status}
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

      </main>

      <div className="absolute bottom-0 right-0 p-4 opacity-40 font-mono text-xs pointer-events-none text-cyber-green">
        🖖🏼 // v1.0
      </div>
    </div>
  );
};

export default App;