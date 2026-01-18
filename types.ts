
export interface Skill {
  name: string;
  category: 'Technical' | 'Soft' | 'Tool' | 'Certification';
}

export interface AnalysisResult {
  matchScore: number;
  skillsMatch: {
    matched: Skill[];
    missing: Skill[];
  };
  experienceAlignment: {
    score: number;
    feedback: string;
  };
  keywordRelevance: {
    score: number;
    topKeywords: string[];
  };
  suggestions: string[];
  atsOptimization: string[];
}

export enum AppState {
  IDLE = 'IDLE',
  PARSING = 'PARSING',
  ANALYZING = 'ANALYZING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}
