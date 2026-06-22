import type { Subject, LearningPath } from "./types";

// ---------------------------------------------------------------------------
// Flagship path: Computer Science via CS50 (CC BY-NC-SA — legal to host/remix
// with attribution). Lesson bodies are original short summaries we author; the
// real teaching material lives in the linked CS50 resources.
// ---------------------------------------------------------------------------

const cs50: LearningPath = {
  slug: "cs50-intro",
  subject: "computer-science",
  title: "CS50 — Introduction to Computer Science",
  provider: "Harvard University",
  providerUrl: "https://cs50.harvard.edu/x/",
  license: "CC BY-NC-SA",
  description:
    "Harvard's legendary introduction to the intellectual enterprises of computer " +
    "science and the art of programming — from binary and algorithms to memory and web apps.",
  estimatedHours: 100,
  lessons: [
    {
      id: "scratch",
      title: "Week 0 — Computational Thinking & Scratch",
      summary: "How computers represent information and the basics of algorithms.",
      body:
        "Computers represent everything — numbers, text, images, sound — as **binary**, " +
        "patterns of 0s and 1s. A single bit is one 0-or-1; eight bits make a **byte**. " +
        "With enough bits we can count arbitrarily high, and by agreeing on encodings " +
        "(like ASCII and Unicode for text, RGB for color) we give those patterns meaning.\n\n" +
        "An **algorithm** is a step-by-step procedure for solving a problem. We judge " +
        "algorithms partly by **correctness** and partly by **efficiency** — how their " +
        "running time grows as the input grows. Pseudocode lets us express an algorithm " +
        "before committing to a programming language, using **functions**, **conditionals**, " +
        "**loops**, and **variables** — the building blocks you'll see in every language.",
      resources: [
        {
          title: "CS50 Week 0 Lecture (full video)",
          url: "https://cs50.harvard.edu/x/weeks/0/",
          kind: "video",
          license: "CC BY-NC-SA",
          attribution: "CS50, Harvard University (David J. Malan)",
        },
        {
          title: "Problem Set 0 — build a project in Scratch",
          url: "https://cs50.harvard.edu/x/psets/0/",
          kind: "exercise",
          license: "CC BY-NC-SA",
          attribution: "CS50, Harvard University",
        },
      ],
      quiz: [
        {
          id: "scratch-q1",
          prompt: "How many distinct values can a single byte (8 bits) represent?",
          choices: ["8", "16", "128", "256"],
          answer: 3,
          explanation: "8 bits give 2^8 = 256 distinct patterns, i.e. values 0–255.",
        },
        {
          id: "scratch-q2",
          prompt: "Which best describes an 'algorithm'?",
          choices: [
            "A programming language",
            "A step-by-step procedure to solve a problem",
            "A type of computer memory",
            "A binary number",
          ],
          answer: 1,
          explanation:
            "An algorithm is a finite, step-by-step procedure for solving a problem — " +
            "independent of any particular language.",
        },
        {
          id: "scratch-q3",
          prompt: "We commonly judge algorithms by correctness and ____.",
          choices: ["color", "efficiency", "file size", "popularity"],
          answer: 1,
          explanation:
            "Beyond being correct, an algorithm's efficiency (how running time grows " +
            "with input size) is a primary concern.",
        },
      ],
    },
    {
      id: "c",
      title: "Week 1 — C: Variables, Types & Control Flow",
      summary: "Writing, compiling, and reasoning about your first real programs.",
      body:
        "**C** is a small, low-level language that makes you aware of what the machine is " +
        "actually doing. Source code you write must be **compiled** into machine code before " +
        "it runs. Every variable has a **type** (like `int`, `float`, `char`, `bool`) that " +
        "determines what it can hold and how much memory it uses.\n\n" +
        "Programs make decisions with **conditionals** (`if`/`else`) and repeat work with " +
        "**loops** (`while`, `for`). Be wary of pitfalls like **integer overflow** (a value " +
        "too big for its type) and **floating-point imprecision** (not every decimal can be " +
        "represented exactly). These aren't C quirks so much as facts about how all computers " +
        "store numbers.",
      resources: [
        {
          title: "CS50 Week 1 Lecture — C",
          url: "https://cs50.harvard.edu/x/weeks/1/",
          kind: "video",
          license: "CC BY-NC-SA",
          attribution: "CS50, Harvard University (David J. Malan)",
        },
        {
          title: "CS50 Manual Pages (reference)",
          url: "https://manual.cs50.io/",
          kind: "notes",
          license: "CC BY-NC-SA",
          attribution: "CS50, Harvard University",
        },
      ],
      quiz: [
        {
          id: "c-q1",
          prompt: "What does a compiler do?",
          choices: [
            "Runs Python line by line",
            "Translates source code into machine code",
            "Stores variables in memory",
            "Connects to the internet",
          ],
          answer: 1,
          explanation:
            "A compiler translates human-readable source code into machine code the CPU can execute.",
        },
        {
          id: "c-q2",
          prompt: "Adding 1 to the largest value an `int` can hold causes…",
          choices: [
            "A syntax error",
            "Integer overflow (it wraps around)",
            "The program to speed up",
            "Nothing — ints are unbounded",
          ],
          answer: 1,
          explanation:
            "A fixed-size int can only hold a limited range; exceeding it causes overflow / wrap-around.",
        },
        {
          id: "c-q3",
          prompt: "Why can `0.1 + 0.2` not equal exactly `0.3` on a computer?",
          choices: [
            "A bug in C",
            "Floating-point numbers can't represent every decimal exactly",
            "The numbers are too large",
            "Loops introduce rounding",
          ],
          answer: 1,
          explanation:
            "Floating-point uses a finite number of bits, so many decimals are stored as close approximations.",
        },
      ],
    },
    {
      id: "memory",
      title: "Week 4 — Memory, Pointers & Arrays",
      summary: "How data lives in memory and what a pointer really is.",
      body:
        "A computer's memory is a long sequence of bytes, each with a numeric **address**. " +
        "A **pointer** is simply a variable that stores such an address — it 'points at' " +
        "where some data lives. Arrays are **contiguous** blocks of memory, which is why " +
        "indexing is fast: the address of element *i* is just the start plus *i* × element size.\n\n" +
        "With this power comes responsibility: reading or writing outside an array's bounds, " +
        "or following a pointer that points nowhere valid, causes bugs like **segmentation " +
        "faults** and **buffer overflows**. Understanding memory is what separates 'it works' " +
        "from 'I know why it works' — and underlies performance and security alike.",
      resources: [
        {
          title: "CS50 Week 4 Lecture — Memory",
          url: "https://cs50.harvard.edu/x/weeks/4/",
          kind: "video",
          license: "CC BY-NC-SA",
          attribution: "CS50, Harvard University (David J. Malan)",
        },
        {
          title: "Problem Set 4 — Filter / Recover",
          url: "https://cs50.harvard.edu/x/psets/4/",
          kind: "exercise",
          license: "CC BY-NC-SA",
          attribution: "CS50, Harvard University",
        },
      ],
      quiz: [
        {
          id: "mem-q1",
          prompt: "What does a pointer store?",
          choices: [
            "A copy of the data",
            "A memory address",
            "The size of an array",
            "A compiled program",
          ],
          answer: 1,
          explanation: "A pointer holds the address in memory where some data is located.",
        },
        {
          id: "mem-q2",
          prompt: "Why is indexing an array fast?",
          choices: [
            "Arrays are sorted",
            "Elements are stored contiguously, so any address is start + i × size",
            "The CPU caches the whole disk",
            "Pointers are disabled",
          ],
          answer: 1,
          explanation:
            "Because array elements are contiguous, the address of element i is computed directly — no searching.",
        },
        {
          id: "mem-q3",
          prompt: "Writing past the end of an array can cause…",
          choices: [
            "Faster code",
            "A buffer overflow / undefined behavior",
            "Automatic resizing",
            "A compile-time error every time",
          ],
          answer: 1,
          explanation:
            "Out-of-bounds writes are a classic source of buffer overflows and security vulnerabilities.",
        },
      ],
    },
  ],
};

export const subjects: Subject[] = [
  {
    slug: "computer-science",
    name: "Computer Science",
    emoji: "💻",
    blurb: "Programming, algorithms, how computers actually work.",
    paths: [cs50],
  },
  {
    slug: "mathematics",
    name: "Mathematics",
    emoji: "📐",
    blurb: "From algebra and calculus to linear algebra and statistics.",
    paths: [],
  },
  {
    slug: "physics",
    name: "Physics",
    emoji: "🔭",
    blurb: "Classical mechanics, electromagnetism, and modern physics.",
    paths: [],
  },
  {
    slug: "biology",
    name: "Biology",
    emoji: "🧬",
    blurb: "Cells, genetics, evolution, and how life works.",
    paths: [],
  },
  {
    slug: "economics",
    name: "Economics",
    emoji: "📈",
    blurb: "Micro, macro, and how incentives shape the world.",
    paths: [],
  },
  {
    slug: "history",
    name: "History",
    emoji: "🏛️",
    blurb: "The forces and stories that shaped the modern world.",
    paths: [],
  },
];

export function getSubject(slug: string): Subject | undefined {
  return subjects.find((s) => s.slug === slug);
}

export function getPath(subjectSlug: string, pathSlug: string): LearningPath | undefined {
  return getSubject(subjectSlug)?.paths.find((p) => p.slug === pathSlug);
}

export function getLesson(subjectSlug: string, pathSlug: string, lessonId: string) {
  const path = getPath(subjectSlug, pathSlug);
  const lesson = path?.lessons.find((l) => l.id === lessonId);
  if (!path || !lesson) return undefined;
  const index = path.lessons.findIndex((l) => l.id === lessonId);
  return {
    path,
    lesson,
    index,
    prev: index > 0 ? path.lessons[index - 1] : undefined,
    next: index < path.lessons.length - 1 ? path.lessons[index + 1] : undefined,
  };
}
