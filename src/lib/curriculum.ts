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

// ---------------------------------------------------------------------------
// Flagship path: Calculus I via OpenStax Calculus Volume 1 (CC BY 4.0 — legal
// to host/remix with attribution). Lesson bodies are original short summaries
// we author; the real textbook material lives in the linked OpenStax chapters.
// ---------------------------------------------------------------------------

const calc1: LearningPath = {
  slug: "calculus-1",
  subject: "mathematics",
  title: "Calculus I — Functions, Limits & Derivatives",
  provider: "OpenStax (Rice University)",
  providerUrl: "https://openstax.org/details/books/calculus-volume-1",
  license: "CC BY",
  description:
    "OpenStax's full single-variable calculus textbook — free, peer-reviewed, and openly " +
    "licensed. Builds from functions and limits up through derivatives and their applications.",
  estimatedHours: 80,
  lessons: [
    {
      id: "functions-graphs",
      title: "Chapter 1 — Functions and Graphs",
      summary: "Reviewing functions, domain and range — the language calculus is written in.",
      body:
        "A **function** assigns exactly one output to each input. Its **domain** is the set " +
        "of allowed inputs and its **range** is the set of possible outputs — knowing both " +
        "tells you where a function is even defined. Functions can be combined: **composition** " +
        "(`f(g(x))`) feeds the output of one function into another, which is exactly how complex " +
        "behavior gets built from simple pieces.\n\n" +
        "Graphing a function is a way of *seeing* its behavior: where it increases or decreases, " +
        "where it's symmetric, where it has gaps or asymptotes. Calculus spends its first chapter " +
        "here because every later idea — limits, derivatives, integrals — is a statement about " +
        "how a function's graph behaves, so precise function language matters before anything else.",
      resources: [
        {
          title: "OpenStax Calculus Volume 1 — Chapter 1: Functions and Graphs",
          url: "https://openstax.org/details/books/calculus-volume-1",
          kind: "reading",
          license: "CC BY",
          attribution: "OpenStax, Rice University",
        },
        {
          title: "Khan Academy — Functions practice",
          url: "https://www.khanacademy.org/math/calculus-1",
          kind: "exercise",
          license: "Linked",
          attribution: "Khan Academy",
        },
      ],
      quiz: [
        {
          id: "math-func-q1",
          prompt: "What is the domain of a function?",
          choices: [
            "The set of all possible outputs",
            "The set of allowed inputs",
            "The graph's symmetry",
            "The function's formula",
          ],
          answer: 1,
          explanation: "The domain is exactly the set of inputs for which the function is defined.",
        },
        {
          id: "math-func-q2",
          prompt: "What does the composition f(g(x)) mean?",
          choices: [
            "f and g multiplied together",
            "Apply g first, then feed its output into f",
            "f and g added together",
            "The average of f and g",
          ],
          answer: 1,
          explanation:
            "Composition chains functions: g(x) is computed first, and its result becomes f's input.",
        },
        {
          id: "math-func-q3",
          prompt: "Why does calculus start with a precise definition of 'function'?",
          choices: [
            "It's a historical accident",
            "Limits, derivatives, and integrals are all statements about function behavior",
            "Functions are only used in algebra",
            "It makes graphs prettier",
          ],
          answer: 1,
          explanation:
            "Every core calculus concept describes how a function behaves, so its language must be precise first.",
        },
      ],
    },
    {
      id: "limits",
      title: "Chapter 2 — Limits",
      summary: "What it means for a function to approach a value, and why limits underlie calculus.",
      body:
        "A **limit** describes the value a function gets arbitrarily close to as its input " +
        "approaches some point — without necessarily ever reaching it. Limits can be approached " +
        "from the left or the right (**one-sided limits**); the limit only exists if both sides " +
        "agree. This lets us reason rigorously about behavior at points where a function might be " +
        "undefined, like a hole or a vertical asymptote.\n\n" +
        "A function is **continuous** at a point when its limit there equals its actual value — " +
        "no jumps, holes, or breaks. Continuity matters because most of the powerful theorems in " +
        "calculus (and the derivative itself) only apply where a function behaves continuously. " +
        "Limits are the precise tool that makes 'approaching' a rigorous, computable idea.",
      resources: [
        {
          title: "OpenStax Calculus Volume 1 — Chapter 2: Limits",
          url: "https://openstax.org/details/books/calculus-volume-1",
          kind: "reading",
          license: "CC BY",
          attribution: "OpenStax, Rice University",
        },
        {
          title: "Khan Academy — Limits and continuity practice",
          url: "https://www.khanacademy.org/math/calculus-1/cs1-limits-and-continuity",
          kind: "exercise",
          license: "Linked",
          attribution: "Khan Academy",
        },
      ],
      quiz: [
        {
          id: "math-lim-q1",
          prompt: "A limit describes…",
          choices: [
            "The exact value a function has at a point",
            "The value a function approaches as the input nears a point",
            "The slope of a line",
            "The domain of a function",
          ],
          answer: 1,
          explanation:
            "A limit is about the approach — what the function gets close to — not necessarily its actual value there.",
        },
        {
          id: "math-lim-q2",
          prompt: "When does a (two-sided) limit exist at a point?",
          choices: [
            "Whenever the function is defined there",
            "When the left-hand and right-hand limits agree",
            "Only at x = 0",
            "Whenever the graph is a straight line",
          ],
          answer: 1,
          explanation: "The limit exists only if both one-sided limits approach the same value.",
        },
        {
          id: "math-lim-q3",
          prompt: "A function is continuous at a point when…",
          choices: [
            "Its limit there is undefined",
            "Its limit there equals its actual value at that point",
            "It has a vertical asymptote there",
            "It is increasing everywhere",
          ],
          answer: 1,
          explanation: "Continuity means no jump or hole: the limit and the function's value match.",
        },
      ],
    },
    {
      id: "derivatives",
      title: "Chapter 3 — Derivatives",
      summary: "The derivative as instantaneous rate of change, and the rules for computing it.",
      body:
        "The **derivative** of a function at a point is its instantaneous rate of change — the " +
        "slope of the line tangent to its graph there. Formally, it's the limit of the **difference " +
        "quotient** `(f(x+h) - f(x)) / h` as `h` approaches zero. This single idea unifies " +
        "'how fast is something changing' across physics, economics, and beyond: velocity is the " +
        "derivative of position, marginal cost is the derivative of total cost.\n\n" +
        "Computing derivatives from the limit definition every time would be slow, so calculus " +
        "develops shortcut rules: the **power rule** (`d/dx[x^n] = n·x^(n-1)`), the **product " +
        "rule**, and the **chain rule** for composed functions. These rules let you differentiate " +
        "almost any function built from familiar pieces without ever touching a limit directly.",
      resources: [
        {
          title: "OpenStax Calculus Volume 1 — Chapter 3: Derivatives",
          url: "https://openstax.org/details/books/calculus-volume-1",
          kind: "reading",
          license: "CC BY",
          attribution: "OpenStax, Rice University",
        },
        {
          title: "Khan Academy — Derivatives practice",
          url: "https://www.khanacademy.org/math/calculus-1/cs1-derivatives-definition-and-basic-rules",
          kind: "exercise",
          license: "Linked",
          attribution: "Khan Academy",
        },
      ],
      quiz: [
        {
          id: "math-deriv-q1",
          prompt: "The derivative at a point is best described as…",
          choices: [
            "The area under the curve up to that point",
            "The instantaneous rate of change / slope of the tangent line",
            "The function's maximum value",
            "The y-intercept",
          ],
          answer: 1,
          explanation:
            "The derivative is the slope of the tangent line — the instantaneous rate of change at that point.",
        },
        {
          id: "math-deriv-q2",
          prompt: "Using the power rule, what is d/dx[x^3]?",
          choices: ["x^2", "3x^2", "3x^3", "x^4/4"],
          answer: 1,
          explanation: "Power rule: d/dx[x^n] = n·x^(n-1), so d/dx[x^3] = 3x^2.",
        },
        {
          id: "math-deriv-q3",
          prompt: "If position is given by a function of time, its derivative represents…",
          choices: ["Acceleration", "Velocity", "Total distance traveled", "Mass"],
          answer: 1,
          explanation: "Velocity is exactly the rate of change of position with respect to time.",
        },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Flagship path: University Physics I via OpenStax University Physics Volume 1
// (CC BY 4.0 — legal to host/remix with attribution). Lesson bodies are
// original short summaries we author; the real textbook material lives in the
// linked OpenStax chapters.
// ---------------------------------------------------------------------------

const univPhysics1: LearningPath = {
  slug: "university-physics-1",
  subject: "physics",
  title: "University Physics I — Mechanics",
  provider: "OpenStax (Rice University)",
  providerUrl: "https://openstax.org/details/books/university-physics-volume-1",
  license: "CC BY",
  description:
    "OpenStax's full calculus-based introductory mechanics textbook — free, peer-reviewed, and " +
    "openly licensed. Builds from units and measurement through motion and Newton's laws.",
  estimatedHours: 90,
  lessons: [
    {
      id: "units-measurement",
      title: "Chapter 1 — Units and Measurement",
      summary: "The SI system, significant figures, and how physics quantifies the world.",
      body:
        "Physics describes the world in numbers attached to **units** — without a unit, a " +
        "measurement is meaningless. The **SI system** defines base units for quantities like " +
        "length (meter), mass (kilogram), and time (second); every other physical quantity is " +
        "built from combinations of these. **Dimensional analysis** — tracking units through a " +
        "calculation — is a powerful sanity check: if the units on both sides of an equation " +
        "don't match, the equation is wrong.\n\n" +
        "No measurement is perfectly precise, so physicists track **significant figures** to " +
        "communicate how precisely a quantity is known, and use **order-of-magnitude estimation** " +
        "to sanity-check whether an answer is even in the right ballpark before trusting the details.",
      resources: [
        {
          title: "OpenStax University Physics Volume 1 — Chapter 1: Units and Measurement",
          url: "https://openstax.org/details/books/university-physics-volume-1",
          kind: "reading",
          license: "CC BY",
          attribution: "OpenStax, Rice University",
        },
        {
          title: "Khan Academy — Measurement and units practice",
          url: "https://www.khanacademy.org/science/physics",
          kind: "exercise",
          license: "Linked",
          attribution: "Khan Academy",
        },
      ],
      quiz: [
        {
          id: "phys-units-q1",
          prompt: "Which is the SI base unit for mass?",
          choices: ["Gram", "Pound", "Kilogram", "Newton"],
          answer: 2,
          explanation: "The kilogram is the SI base unit for mass; the gram is a derived submultiple.",
        },
        {
          id: "phys-units-q2",
          prompt: "What is dimensional analysis used for?",
          choices: [
            "Measuring significant figures",
            "Checking that units on both sides of an equation match",
            "Converting between languages",
            "Rounding decimals",
          ],
          answer: 1,
          explanation:
            "Tracking units through a calculation catches errors — mismatched units mean the equation is wrong.",
        },
        {
          id: "phys-units-q3",
          prompt: "Significant figures communicate…",
          choices: [
            "The unit system used",
            "How precisely a measured quantity is known",
            "The mass of an object",
            "The direction of a vector",
          ],
          answer: 1,
          explanation: "Significant figures indicate the precision/reliability of a measurement.",
        },
      ],
    },
    {
      id: "motion-1d",
      title: "Chapter 3 — Motion Along a Straight Line",
      summary: "Position, velocity, and acceleration — and the kinematics equations linking them.",
      body:
        "**Position** locates an object; **displacement** is its change in position, while " +
        "**distance** is the total path length traveled — they differ whenever you backtrack. " +
        "**Velocity** is the rate of change of position (it's a vector, with direction), and " +
        "**acceleration** is the rate of change of velocity. A car braking has acceleration " +
        "opposite its velocity even though it's slowing down, not speeding up.\n\n" +
        "When acceleration is constant, a small set of **kinematics equations** relate position, " +
        "velocity, acceleration, and time — letting you solve for any one of them given the " +
        "others. These equations are derived directly from the definitions of velocity and " +
        "acceleration as rates of change, the same idea calculus calls a derivative.",
      resources: [
        {
          title: "OpenStax University Physics Volume 1 — Chapter 3: Motion Along a Straight Line",
          url: "https://openstax.org/details/books/university-physics-volume-1",
          kind: "reading",
          license: "CC BY",
          attribution: "OpenStax, Rice University",
        },
        {
          title: "Khan Academy — 1D kinematics practice",
          url: "https://www.khanacademy.org/science/physics/one-dimensional-motion",
          kind: "exercise",
          license: "Linked",
          attribution: "Khan Academy",
        },
      ],
      quiz: [
        {
          id: "phys-kin-q1",
          prompt: "What distinguishes velocity from speed?",
          choices: [
            "Velocity has direction; speed does not",
            "They are always identical",
            "Speed is measured in meters, velocity in feet",
            "Velocity only applies to circular motion",
          ],
          answer: 0,
          explanation: "Velocity is a vector (magnitude + direction); speed is just the magnitude.",
        },
        {
          id: "phys-kin-q2",
          prompt: "A car braking while moving forward has acceleration that is…",
          choices: [
            "Zero",
            "In the same direction as its velocity",
            "Opposite its velocity",
            "Undefined",
          ],
          answer: 2,
          explanation:
            "Slowing down means velocity is decreasing, so acceleration points opposite the direction of motion.",
        },
        {
          id: "phys-kin-q3",
          prompt: "The kinematics equations for constant acceleration relate…",
          choices: [
            "Mass, charge, and energy",
            "Position, velocity, acceleration, and time",
            "Force and friction only",
            "Temperature and pressure",
          ],
          answer: 1,
          explanation:
            "They let you solve for any one of position, velocity, acceleration, or time given the others.",
        },
      ],
    },
    {
      id: "newtons-laws",
      title: "Chapter 5 — Newton's Laws of Motion",
      summary: "Force, mass, and inertia — the three laws that govern classical motion.",
      body:
        "Newton's **first law** says an object at rest stays at rest, and one in motion stays in " +
        "motion at constant velocity, unless acted on by a net external force — this tendency is " +
        "**inertia**. The **second law**, `F = ma`, quantifies it: net force equals mass times " +
        "acceleration, so the same force produces less acceleration on a more massive object.\n\n" +
        "The **third law** states that forces come in pairs — when object A exerts a force on " +
        "object B, B exerts an equal and opposite force back on A. **Free-body diagrams**, which " +
        "isolate an object and draw every force acting on it, are the standard tool for applying " +
        "these laws to real situations like blocks on inclines or objects with friction.",
      resources: [
        {
          title: "OpenStax University Physics Volume 1 — Chapter 5: Newton's Laws of Motion",
          url: "https://openstax.org/details/books/university-physics-volume-1",
          kind: "reading",
          license: "CC BY",
          attribution: "OpenStax, Rice University",
        },
        {
          title: "Khan Academy — Newton's laws practice",
          url: "https://www.khanacademy.org/science/physics/forces-newtons-laws",
          kind: "exercise",
          license: "Linked",
          attribution: "Khan Academy",
        },
      ],
      quiz: [
        {
          id: "phys-newton-q1",
          prompt: "Newton's first law describes…",
          choices: [
            "F = ma",
            "Inertia — objects resist changes to their motion absent a net force",
            "Action-reaction force pairs",
            "Gravity between two masses",
          ],
          answer: 1,
          explanation: "The first law is the law of inertia: no net force means no change in velocity.",
        },
        {
          id: "phys-newton-q2",
          prompt: "Using F = ma, if mass doubles and force stays the same, acceleration…",
          choices: ["Doubles", "Halves", "Stays the same", "Becomes zero"],
          answer: 1,
          explanation: "Acceleration = F/m, so doubling mass with constant force halves the acceleration.",
        },
        {
          id: "phys-newton-q3",
          prompt: "Newton's third law says that when A pushes on B…",
          choices: [
            "B accelerates twice as fast as A",
            "B pushes back on A with equal magnitude, opposite direction",
            "A loses momentum permanently",
            "Friction is eliminated",
          ],
          answer: 1,
          explanation: "Forces always come in equal-and-opposite action-reaction pairs.",
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
    paths: [calc1],
  },
  {
    slug: "physics",
    name: "Physics",
    emoji: "🔭",
    blurb: "Classical mechanics, electromagnetism, and modern physics.",
    paths: [univPhysics1],
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
