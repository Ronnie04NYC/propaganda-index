import { Question, LeaderboardEntry } from './types';

export const MAX_SCORE = 140; // 14 questions * 10 points max
export const APP_URL = "https://propaganda-index.vercel.app"; // Placeholder for your eventual Vercel link
export const DONATION_WALLET = "0x1234...5678"; // Placeholder - Replace with your actual Base/ETH address

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { id: "SUBJ-8X92", timestamp: "2m ago", classification: "Tinfoil Hat Warlord", score: 112, status: "MAXIMUM PROPAGANDA" },
  { id: "SUBJ-3M21", timestamp: "5m ago", classification: "Corporate Stooge", score: 95, status: "MAXIMUM PROPAGANDA" },
  { id: "SUBJ-7K44", timestamp: "12m ago", classification: "Normie", score: 45, status: "MODERATELY INFLUENCED" },
  { id: "SUBJ-9L11", timestamp: "18m ago", classification: "Reality Hacker", score: 15, status: "CRITICAL THINKER" },
  { id: "SUBJ-2P99", timestamp: "24m ago", classification: "Algorithmic Victim", score: 68, status: "HIGHLY PROGRAMMED" },
];

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "When a major breaking news story hits, what is your immediate reaction?",
    options: [
      { text: "I check CNN/NYT/Fox to see what the official story is.", score: 8, bias: 'establishment' },
      { text: "I assume it's a false flag operation designed to distract us.", score: 10, bias: 'conspiracy' },
      { text: "I check multiple independent sources and wait 24 hours for facts.", score: 0, bias: 'neutral' },
      { text: "I check Twitter/X to see what my favorite influencer says.", score: 7, bias: 'conspiracy' },
    ]
  },
  {
    id: 2,
    text: "How do you view the 'Deep State' or administrative bureaucracy?",
    options: [
      { text: "It doesn't exist; they are just public servants doing their job.", score: 8, bias: 'establishment' },
      { text: "It's a satanic cabal drinking blood in the basement.", score: 10, bias: 'conspiracy' },
      { text: "It's an entrenched system of unelected officials protecting their own interests.", score: 2, bias: 'neutral' },
      { text: "They are the only thing saving democracy from fascism.", score: 7, bias: 'establishment' },
    ]
  },
  {
    id: 3,
    text: "What is the primary purpose of billionaire-owned media outlets?",
    options: [
      { text: "To inform the public and hold power accountable.", score: 9, bias: 'establishment' },
      { text: "To brainwash the masses into subservience for the elites.", score: 2, bias: 'neutral' },
      { text: "To spread woke mind viruses.", score: 6, bias: 'conspiracy' },
      { text: "To protect corporate stock prices and manufacture consent.", score: 1, bias: 'neutral' },
    ]
  },
  {
    id: 4,
    text: "Pick the phrase that best describes the current state of the economy.",
    options: [
      { text: "The stock market is up, so the economy is strong!", score: 8, bias: 'establishment' },
      { text: "The Globalist Reset is intentionally collapsing the dollar.", score: 9, bias: 'conspiracy' },
      { text: "Wealth inequality is skyrocketing while purchasing power collapses.", score: 0, bias: 'neutral' },
      { text: "It's all Biden/Trump's fault specifically.", score: 7, bias: 'neutral' },
    ]
  },
  {
    id: 5,
    text: "How do you feel about social media algorithms?",
    options: [
      { text: "They show me what I like, I don't mind.", score: 6, bias: 'establishment' },
      { text: "They are designed to radicalize me and sell my attention.", score: 0, bias: 'neutral' },
      { text: "They are specifically targeting ME to silence the truth.", score: 8, bias: 'conspiracy' },
      { text: "We need more censorship to stop disinformation.", score: 9, bias: 'establishment' },
    ]
  },
  {
    id: 6,
    text: "Regarding the United States' foreign policy and military interventions:",
    options: [
      { text: "We are the world police spreading democracy.", score: 9, bias: 'establishment' },
      { text: "The military-industrial complex profits from perpetual war.", score: 1, bias: 'neutral' },
      { text: "We should nuke our enemies and take their oil.", score: 8, bias: 'conspiracy' },
      { text: "Every war is a distraction from the aliens.", score: 10, bias: 'conspiracy' },
    ]
  },
  {
    id: 7,
    text: "When you hear the term 'Woke', what do you think?",
    options: [
      { text: "It's a dangerous mental illness destroying civilization.", score: 8, bias: 'conspiracy' },
      { text: "It's simply about being kind and inclusive.", score: 7, bias: 'establishment' },
      { text: "It's a marketing term used by corporations to pretend they care.", score: 1, bias: 'neutral' },
      { text: "I don't care, just give me healthcare.", score: 0, bias: 'neutral' },
    ]
  },
  {
    id: 8,
    text: "Climate Change is:",
    options: [
      { text: "A hoax invented to tax us and control our movement.", score: 9, bias: 'conspiracy' },
      { text: "Going to kill us all in 5 years if we don't ban straws.", score: 8, bias: 'establishment' },
      { text: "A complex issue exacerbated by industrial pollution requiring systemic change.", score: 1, bias: 'neutral' },
      { text: "Real, but individual carbon footprints are a myth to shift blame from companies.", score: 0, bias: 'neutral' },
    ]
  },
  {
    id: 9,
    text: "How do you view the opposing political party?",
    options: [
      { text: "They are literally evil and hate this country.", score: 10, bias: 'neutral' },
      { text: "They are misguided but human.", score: 0, bias: 'neutral' },
      { text: "They are grooming children/Nazis (depending on side).", score: 9, bias: 'neutral' },
      { text: "Two wings of the same corporate bird.", score: 1, bias: 'neutral' },
    ]
  },
  {
    id: 10,
    text: "Elections in the United States are:",
    options: [
      { text: "Secure, fair, and the most robust in the world.", score: 7, bias: 'establishment' },
      { text: "Completely rigged by Venezuelan voting machines.", score: 10, bias: 'conspiracy' },
      { text: "Heavily influenced by gerrymandering and dark money lobbying.", score: 1, bias: 'neutral' },
      { text: "A selection, not an election.", score: 2, bias: 'neutral' },
    ]
  },
  {
    id: 11,
    text: "What is your opinion on 'Scientific Consensus'?",
    options: [
      { text: "Trust the Science™ unconditionally.", score: 8, bias: 'establishment' },
      { text: "Science is a liberal scam.", score: 10, bias: 'conspiracy' },
      { text: "Science is a process of questioning, not a dogma.", score: 0, bias: 'neutral' },
      { text: "Scientists are bought by grant money.", score: 4, bias: 'conspiracy' },
    ]
  },
  {
    id: 12,
    text: "The 'Establishment' cares about:",
    options: [
      { text: "My safety and well-being.", score: 9, bias: 'establishment' },
      { text: "Power, control, and self-preservation.", score: 0, bias: 'neutral' },
      { text: "Replacing the population.", score: 8, bias: 'conspiracy' },
      { text: "Nothing, they are incompetent.", score: 3, bias: 'neutral' },
    ]
  },
  {
    id: 13,
    text: "Regarding Cryptocurrencies and CBDCs (Central Bank Digital Currencies):",
    options: [
      { text: "Crypto is a scam, CBDCs are convenient and safe.", score: 8, bias: 'establishment' },
      { text: "CBDCs are the Mark of the Beast/Total Control Grid.", score: 5, bias: 'conspiracy' },
      { text: "It's financial speculation, but decentralization is interesting.", score: 1, bias: 'neutral' },
      { text: "I only trade Dogecoin because Elon said so.", score: 7, bias: 'conspiracy' },
    ]
  },
  {
    id: 14,
    text: "Finally, why are you taking this test?",
    options: [
      { text: "To prove I'm smarter than everyone else.", score: 5, bias: 'neutral' },
      { text: "Because the algorithm told me to.", score: 8, bias: 'establishment' },
      { text: "I'm bored and enjoy self-reflection.", score: 0, bias: 'neutral' },
      { text: "To find out if I'm a sleeper agent.", score: 2, bias: 'conspiracy' },
    ]
  },
];