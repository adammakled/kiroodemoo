import { streamText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";

export const maxDuration = 30;

interface AnalysisBody {
  problemTitle: string;
  problemDescription: string;
  userCode: string;
  optimalSolution: string;
  optimalComplexity: string;
  language: string;
}

// Direct Anthropic provider — reuses the same ANTHROPIC_API_KEY as the tutor.
const MODEL = process.env.TUTOR_MODEL ?? "claude-haiku-4-5";

function systemPrompt(): string {
  return [
    "You are an expert coding coach with a chess-engine mindset.",
    "You analyze a programmer's in-progress code against the optimal solution in real time.",
    "",
    "Your response MUST follow this exact format — no extra prose before or after:",
    "",
    "RATING: <one of: Optimal | Good | Inaccurate | Blunder>",
    "SUMMARY: <one sentence — what the current approach is doing>",
    "FEEDBACK: <2-3 sentences — specific, constructive analysis comparing to optimal>",
    "HINT: <one sentence — the single most useful next nudge, without giving away the answer>",
    "",
    "Rating guide:",
    "- Optimal: The approach matches or is equivalent to the optimal solution's strategy.",
    "- Good: Correct direction but missing a key optimization (e.g. using sort instead of hash map).",
    "- Inaccurate: Partially on track but with a logical error, wrong data structure, or off-by-one.",
    "- Blunder: Fundamentally wrong approach (e.g. O(n³) brute force when O(n) is straightforward, deeply nested loops where a single pass works).",
    "",
    "If the code is mostly empty or just the starter stub, rate it as Blunder and encourage them to start.",
    "Be direct but encouraging. Never reveal the full optimal solution.",
  ].join("\n");
}

function userPrompt(body: AnalysisBody): string {
  return [
    `Problem: ${body.problemTitle}`,
    `Description: ${body.problemDescription}`,
    `Language: ${body.language}`,
    `Optimal complexity: ${body.optimalComplexity}`,
    "",
    "--- Optimal solution (for your reference only, do not reveal) ---",
    body.optimalSolution,
    "---",
    "",
    "--- User's current code ---",
    body.userCode,
    "---",
    "",
    "Analyze the user's approach now.",
  ].join("\n");
}

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json(
      {
        error:
          "AI coach isn't configured. Set ANTHROPIC_API_KEY in .env.local to enable real-time analysis.",
      },
      { status: 503 },
    );
  }

  let body: AnalysisBody;
  try {
    body = (await req.json()) as AnalysisBody;
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!body.userCode?.trim()) {
    return Response.json({ error: "No code to analyze." }, { status: 400 });
  }

  const result = streamText({
    model: anthropic(MODEL),
    system: systemPrompt(),
    messages: [{ role: "user", content: userPrompt(body) }],
  });

  return result.toTextStreamResponse();
}
