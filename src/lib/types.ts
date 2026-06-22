// Core domain types for OpenLearn.

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
  /** Available paths. Empty = subject is "coming soon / contribute". */
  paths: LearningPath[];
}
