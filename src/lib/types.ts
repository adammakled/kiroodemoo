// Core domain types for OpenLearn.

// ---------------------------------------------------------------------------
// Coding challenge types (LeetCode-style path)
// ---------------------------------------------------------------------------

export type Difficulty = "Easy" | "Medium" | "Hard";

export type MoveQuality = "Optimal" | "Good" | "Inaccurate" | "Blunder";

export interface CodingProblem {
  id: string;
  title: string;
  summary: string;
  /** Full problem description in markdown-ish prose. */
  description: string;
  difficulty: Difficulty;
  /** The language for the editor (e.g. "python", "javascript"). */
  language: string;
  /** Starter code shown in the editor. */
  starterCode: string;
  /** The canonical optimal solution — sent to the AI, never shown to the user directly. */
  optimalSolution: string;
  /** Key insight about the optimal approach shown after the session. */
  optimalExplanation: string;
  /** Time complexity of the optimal solution e.g. "O(n)". */
  optimalComplexity: string;
  /** Tags like ["array", "two pointers"]. */
  tags: string[];
}

// ---------------------------------------------------------------------------
// Original types
// ---------------------------------------------------------------------------

export type License =
  | "CC BY"
  | "CC BY-SA"
  | "CC BY-NC-SA"
  | "CC BY-NC"
  | "Public Domain"
  | "Linked"; // not hosted by us — we only point to it

export interface Resource {
  title: string;
  url: string;
  kind: "video" | "reading" | "exercise" | "notes";
  /** License of the resource. "Linked" means we do not host it, only point to it. */
  license: License;
  attribution: string;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  choices: string[];
  /** Index into `choices`. */
  answer: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  /** One-line summary shown in the path overview. */
  summary: string;
  /** Markdown-ish lesson body we host (kept short for the MVP). */
  body: string;
  /** Curated external/hosted resources for this lesson. */
  resources: Resource[];
  quiz: QuizQuestion[];
}

export interface LearningPath {
  slug: string;
  subject: string;
  title: string;
  provider: string;
  providerUrl: string;
  license: License;
  description: string;
  /** Rough hours to complete, for expectation-setting. */
  estimatedHours: number;
  lessons: Lesson[];
}

export interface Subject {
  slug: string;
  name: string;
  emoji: string;
  blurb: string;
  /** Available learning paths. Empty = subject is "coming soon / contribute". */
  paths: LearningPath[];
  /** Available coding challenge paths. */
  codingPaths?: CodingPath[];
}

export interface CodingPath {
  slug: string;
  subject: string;
  title: string;
  description: string;
  estimatedHours: number;
  problems: CodingProblem[];
}
