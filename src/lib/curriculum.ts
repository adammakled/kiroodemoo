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
// Biology via OpenStax Biology 2e (CC BY 4.0 — freely hostable with attribution),
// with MIT OpenCourseWare lectures as a secondary resource.
// ---------------------------------------------------------------------------

const biology: LearningPath = {
  slug: "intro-biology",
  subject: "biology",
  title: "Introduction to Biology",
  provider: "OpenStax (Rice University)",
  providerUrl: "https://openstax.org/details/books/biology-2e",
  license: "CC BY",
  description:
    "How life works, from the molecules inside a single cell to the genes passed " +
    "between generations — built on OpenStax's free, peer-reviewed Biology 2e.",
  estimatedHours: 40,
  lessons: [
    {
      id: "cell",
      title: "Unit 1 — The Cell: Life's Basic Unit",
      summary: "Cell theory, and how prokaryotic and eukaryotic cells are organized.",
      body:
        "Modern biology rests on **cell theory**: all living things are made of cells, the " +
        "cell is the basic unit of life, and all cells come from pre-existing cells. Cells " +
        "fall into two broad groups. **Prokaryotic** cells (like bacteria) are small and lack " +
        "a membrane-bound nucleus. **Eukaryotic** cells (plants, animals, fungi) are larger " +
        "and keep their DNA inside a **nucleus**, alongside specialized **organelles**.\n\n" +
        "Organelles divide the labor of the cell: the nucleus stores genetic information, " +
        "**mitochondria** release usable energy as ATP, and **ribosomes** assemble proteins. " +
        "Cells stay small for a reason — as a cell grows, its volume rises faster than its " +
        "surface area, and it can no longer exchange materials with its surroundings fast enough.",
      resources: [
        {
          title: "OpenStax Biology 2e — Cell Structure and Function",
          url: "https://openstax.org/books/biology-2e/pages/4-introduction",
          kind: "reading",
          license: "CC BY",
          attribution: "OpenStax, Rice University",
        },
        {
          title: "MIT 7.01SC — Fundamentals of Biology (lectures)",
          url: "https://ocw.mit.edu/courses/7-01sc-fundamentals-of-biology-fall-2011/",
          kind: "video",
          license: "CC BY-NC-SA",
          attribution: "MIT OpenCourseWare",
        },
      ],
      quiz: [
        {
          id: "cell-q1",
          prompt: "Which statement is a core tenet of cell theory?",
          choices: [
            "Cells arise spontaneously from non-living matter",
            "All living things are composed of one or more cells",
            "Only animals are made of cells",
            "Cells do not contain genetic material",
          ],
          answer: 1,
          explanation:
            "Cell theory holds that all living organisms are made of cells, the cell is " +
            "life's basic unit, and cells come from pre-existing cells.",
        },
        {
          id: "cell-q2",
          prompt: "A defining feature of a eukaryotic cell is…",
          choices: [
            "The complete absence of DNA",
            "A membrane-bound nucleus",
            "Being smaller than a bacterium",
            "Having no organelles",
          ],
          answer: 1,
          explanation:
            "Eukaryotic cells enclose their DNA in a membrane-bound nucleus; prokaryotes do not.",
        },
        {
          id: "cell-q3",
          prompt: "Which organelle is primarily responsible for producing usable energy (ATP)?",
          choices: ["Ribosome", "Nucleus", "Mitochondrion", "Cell wall"],
          answer: 2,
          explanation:
            "Mitochondria carry out cellular respiration, releasing energy stored in food as ATP.",
        },
      ],
    },
    {
      id: "energy",
      title: "Unit 2 — Energy: Photosynthesis & Respiration",
      summary: "How cells capture, store, and release energy.",
      body:
        "Every living thing needs a constant supply of energy. **Photosynthesis**, carried out " +
        "by plants and algae, captures light energy and uses it to turn carbon dioxide and water " +
        "into **glucose** (a sugar) and oxygen. In effect, it stores the sun's energy in chemical " +
        "bonds.\n\n" +
        "**Cellular respiration** runs the process in reverse: it breaks glucose down using oxygen " +
        "to release that stored energy, capturing it as **ATP** — the cell's energy currency — and " +
        "giving off carbon dioxide and water. Together these reactions are why **energy flows** " +
        "through ecosystems (sun → producers → consumers) while **matter cycles**. The whole set " +
        "of an organism's chemical reactions is its **metabolism**.",
      resources: [
        {
          title: "OpenStax Biology 2e — Photosynthesis",
          url: "https://openstax.org/books/biology-2e/pages/8-introduction",
          kind: "reading",
          license: "CC BY",
          attribution: "OpenStax, Rice University",
        },
        {
          title: "OpenStax Biology 2e — Cellular Respiration",
          url: "https://openstax.org/books/biology-2e/pages/7-introduction",
          kind: "reading",
          license: "CC BY",
          attribution: "OpenStax, Rice University",
        },
      ],
      quiz: [
        {
          id: "energy-q1",
          prompt: "Photosynthesis stores captured light energy chemically in…",
          choices: ["Oxygen gas", "Glucose", "Water", "Carbon dioxide"],
          answer: 1,
          explanation:
            "Photosynthesis builds glucose, locking light energy into the bonds of that sugar; " +
            "oxygen is released as a by-product.",
        },
        {
          id: "energy-q2",
          prompt: "What is the cell's main energy currency?",
          choices: ["DNA", "ATP", "Glucose", "Chlorophyll"],
          answer: 1,
          explanation:
            "ATP (adenosine triphosphate) is the molecule cells use to power most of their work.",
        },
        {
          id: "energy-q3",
          prompt: "Cellular respiration consumes oxygen and produces…",
          choices: [
            "Glucose and light",
            "Carbon dioxide and water",
            "Only oxygen",
            "Proteins and DNA",
          ],
          answer: 1,
          explanation:
            "Respiration oxidizes glucose, releasing energy as ATP and giving off CO₂ and water.",
        },
      ],
    },
    {
      id: "genetics",
      title: "Unit 3 — DNA, Genes & Inheritance",
      summary: "How information is stored in DNA and passed to offspring.",
      body:
        "Hereditary information is stored in **DNA** as a sequence of four chemical bases: " +
        "**A, T, C, and G**. A **gene** is a stretch of DNA that codes for a product — most often " +
        "a protein. The flow of that information follows the **central dogma**: DNA is transcribed " +
        "into **RNA**, which is then translated into **protein**.\n\n" +
        "Offspring inherit versions of genes, called **alleles**, from each parent. Some alleles are " +
        "**dominant** (mask others) and some **recessive**. An organism's genetic makeup is its " +
        "**genotype**; the traits you can actually observe are its **phenotype**. Gregor Mendel " +
        "worked out these patterns of inheritance with pea plants long before DNA was discovered.",
      resources: [
        {
          title: "OpenStax Biology 2e — DNA Structure and Function",
          url: "https://openstax.org/books/biology-2e/pages/14-introduction",
          kind: "reading",
          license: "CC BY",
          attribution: "OpenStax, Rice University",
        },
        {
          title: "OpenStax Biology 2e — Mendel's Experiments and Heredity",
          url: "https://openstax.org/books/biology-2e/pages/12-introduction",
          kind: "reading",
          license: "CC BY",
          attribution: "OpenStax, Rice University",
        },
      ],
      quiz: [
        {
          id: "gen-q1",
          prompt: "The four bases of DNA are A, T, C, and…",
          choices: ["U", "G", "P", "M"],
          answer: 1,
          explanation: "DNA uses A, T, C, and G. (RNA swaps T for U.)",
        },
        {
          id: "gen-q2",
          prompt: "The central dogma describes information flowing from DNA to RNA to…",
          choices: ["Sugar", "Protein", "Lipid", "Water"],
          answer: 1,
          explanation: "DNA → RNA → protein: transcription then translation.",
        },
        {
          id: "gen-q3",
          prompt: "An organism's observable traits are called its…",
          choices: ["Genotype", "Phenotype", "Allele", "Genome"],
          answer: 1,
          explanation:
            "Phenotype = observable traits; genotype = the underlying genetic makeup that, with " +
            "the environment, produces them.",
        },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Economics via OpenStax Principles of Economics 3e (CC BY 4.0), with MIT
// OpenCourseWare microeconomics lectures as a secondary resource.
// ---------------------------------------------------------------------------

const economics: LearningPath = {
  slug: "principles-economics",
  subject: "economics",
  title: "Principles of Economics",
  provider: "OpenStax (Rice University)",
  providerUrl: "https://openstax.org/details/books/principles-economics-3e",
  license: "CC BY",
  description:
    "How individuals and societies make choices under scarcity — opportunity cost, " +
    "supply and demand, and elasticity — from OpenStax's free Principles of Economics 3e.",
  estimatedHours: 35,
  lessons: [
    {
      id: "scarcity",
      title: "Unit 1 — Scarcity, Choice & Opportunity Cost",
      summary: "Why every choice has a cost, and how economists think at the margin.",
      body:
        "Economics begins with a simple fact: our wants are effectively unlimited, but resources " +
        "are **scarce**. Because we can't have everything, every choice means giving something up. " +
        "The value of the next-best alternative you forgo is its **opportunity cost** — the true " +
        "cost of any decision.\n\n" +
        "The **production possibilities frontier (PPF)** models this: it shows the combinations of " +
        "two goods an economy can produce, and the trade-off of making more of one means making " +
        "less of the other. Good decisions are usually made **at the margin** — comparing the " +
        "additional (marginal) benefit of one more unit against its additional cost, rather than " +
        "thinking all-or-nothing.",
      resources: [
        {
          title: "OpenStax Principles of Economics 3e — Choice in a World of Scarcity",
          url: "https://openstax.org/books/principles-economics-3e/pages/2-introduction-to-choice-in-a-world-of-scarcity",
          kind: "reading",
          license: "CC BY",
          attribution: "OpenStax, Rice University",
        },
        {
          title: "MIT 14.01 — Principles of Microeconomics (lectures)",
          url: "https://ocw.mit.edu/courses/14-01-principles-of-microeconomics-fall-2018/",
          kind: "video",
          license: "CC BY-NC-SA",
          attribution: "MIT OpenCourseWare",
        },
      ],
      quiz: [
        {
          id: "scar-q1",
          prompt: "Opportunity cost is best defined as…",
          choices: [
            "The money paid for a good",
            "The value of the next-best alternative you give up",
            "The total cost of all alternatives combined",
            "A cost that never changes",
          ],
          answer: 1,
          explanation:
            "Opportunity cost is what you sacrifice — the single next-best option forgone when " +
            "you make a choice.",
        },
        {
          id: "scar-q2",
          prompt: "Economics exists as a discipline mainly because resources are…",
          choices: ["Unlimited", "Scarce", "Free", "Identical"],
          answer: 1,
          explanation:
            "Scarcity — limited resources against unlimited wants — forces the choices economics studies.",
        },
        {
          id: "scar-q3",
          prompt: "\"Thinking at the margin\" means comparing…",
          choices: [
            "Total benefits to total costs",
            "Additional benefits to additional costs of one more unit",
            "Prices across countries",
            "Past costs to future costs",
          ],
          answer: 1,
          explanation:
            "Marginal analysis weighs the extra benefit of one more unit against its extra cost.",
        },
      ],
    },
    {
      id: "supply-demand",
      title: "Unit 2 — Demand, Supply & Market Equilibrium",
      summary: "How prices emerge from the interaction of buyers and sellers.",
      body:
        "The **law of demand** says that, all else equal, as the price of a good rises, the quantity " +
        "buyers want falls — which is why demand curves slope downward. The **law of supply** says " +
        "the opposite for sellers: higher prices make producing more worthwhile, so supply curves " +
        "slope upward.\n\n" +
        "Where the two curves cross is the **equilibrium** — the price at which the quantity buyers " +
        "want exactly equals the quantity sellers offer. If a price sits **below** equilibrium, " +
        "buyers want more than is available and a **shortage** appears, pushing the price up. If it " +
        "sits **above**, sellers can't sell it all and a **surplus** pushes the price down. Markets " +
        "tend to move toward equilibrium on their own.",
      resources: [
        {
          title: "OpenStax Principles of Economics 3e — Demand and Supply",
          url: "https://openstax.org/books/principles-economics-3e/pages/3-introduction-to-demand-and-supply",
          kind: "reading",
          license: "CC BY",
          attribution: "OpenStax, Rice University",
        },
        {
          title: "OpenStax Principles of Economics 3e — Demand, Supply, and Efficiency",
          url: "https://openstax.org/books/principles-economics-3e/pages/4-introduction-to-labor-and-financial-markets",
          kind: "reading",
          license: "CC BY",
          attribution: "OpenStax, Rice University",
        },
      ],
      quiz: [
        {
          id: "sd-q1",
          prompt: "The law of demand states that, all else equal, as price rises, quantity demanded…",
          choices: ["Rises", "Falls", "Stays the same", "Becomes infinite"],
          answer: 1,
          explanation:
            "Higher prices reduce the quantity buyers are willing and able to purchase — the " +
            "downward-sloping demand curve.",
        },
        {
          id: "sd-q2",
          prompt: "Market equilibrium occurs where…",
          choices: [
            "Price is zero",
            "Quantity supplied equals quantity demanded",
            "Supply is at its maximum",
            "There are no buyers",
          ],
          answer: 1,
          explanation:
            "Equilibrium is the price and quantity at which the supply and demand curves intersect.",
        },
        {
          id: "sd-q3",
          prompt: "A price held below the equilibrium price tends to cause a…",
          choices: ["Surplus", "Shortage", "New equilibrium instantly", "Higher supply"],
          answer: 1,
          explanation:
            "Below equilibrium, quantity demanded exceeds quantity supplied — a shortage — which " +
            "pressures the price upward.",
        },
      ],
    },
    {
      id: "elasticity",
      title: "Unit 3 — Elasticity",
      summary: "Measuring how responsive buyers and sellers are to price changes.",
      body:
        "**Price elasticity of demand** measures how strongly the quantity demanded responds to a " +
        "change in price. When a small price change causes a large change in quantity, demand is " +
        "**elastic** (elasticity greater than 1). When quantity barely moves, demand is " +
        "**inelastic** (less than 1).\n\n" +
        "What makes a good elastic? Plenty of close **substitutes**, being a **luxury** rather than " +
        "a necessity, a longer **time horizon** to adjust, and taking up a large share of your " +
        "budget all push toward elastic demand. Elasticity matters in practice because it predicts " +
        "what a price change does to **total revenue**: raising the price of an inelastic good " +
        "(like insulin) raises revenue, while raising the price of an elastic good can lower it.",
      resources: [
        {
          title: "OpenStax Principles of Economics 3e — Elasticity",
          url: "https://openstax.org/books/principles-economics-3e/pages/5-introduction-to-elasticity",
          kind: "reading",
          license: "CC BY",
          attribution: "OpenStax, Rice University",
        },
        {
          title: "MIT 14.01 — Principles of Microeconomics (lectures)",
          url: "https://ocw.mit.edu/courses/14-01-principles-of-microeconomics-fall-2018/",
          kind: "video",
          license: "CC BY-NC-SA",
          attribution: "MIT OpenCourseWare",
        },
      ],
      quiz: [
        {
          id: "el-q1",
          prompt: "Demand is called \"elastic\" when a price change causes a…",
          choices: [
            "Relatively large change in quantity demanded",
            "Very small change in quantity demanded",
            "No change in quantity demanded",
            "Change only in supply",
          ],
          answer: 0,
          explanation:
            "Elastic demand (elasticity > 1) means quantity demanded responds strongly to price.",
        },
        {
          id: "el-q2",
          prompt: "Goods with many close substitutes tend to have demand that is more…",
          choices: ["Inelastic", "Elastic", "Fixed", "Vertical"],
          answer: 1,
          explanation:
            "If buyers can easily switch to substitutes, they respond strongly to price changes — elastic demand.",
        },
        {
          id: "el-q3",
          prompt: "A necessity with few substitutes (e.g. insulin) tends to have demand that is…",
          choices: ["Elastic", "Inelastic", "Perfectly elastic", "Zero"],
          answer: 1,
          explanation:
            "With no good alternatives and a real need, buyers keep purchasing even as price rises — inelastic demand.",
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
    paths: [biology],
  },
  {
    slug: "economics",
    name: "Economics",
    emoji: "📈",
    blurb: "Micro, macro, and how incentives shape the world.",
    paths: [economics],
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
