export interface Option {
  text: string;
  score: number; // 0 = Low exposure, 10 = High exposure
  bias?: 'establishment' | 'conspiracy' | 'neutral';
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
}

export interface QuizState {
  currentQuestionIndex: number;
  answers: { questionId: number; selectedOption: Option }[];
  score: number;
  status: 'intro' | 'quiz' | 'analyzing' | 'results';
}

export interface AnalysisResult {
  title: string;
  description: string;
  traits: string[];
}

export interface LeaderboardEntry {
  id: string;
  timestamp: string;
  classification: string;
  score: number;
  status: string;
}