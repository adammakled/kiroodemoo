"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import type { CodingProblem, MoveQuality } from "@/lib/types";
import { Prose } from "@/components/Prose";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Analysis {
  rating: MoveQuality;
  summary: string;
  feedback: string;
  hint: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const RATING_CONFIG: Record<
  MoveQuality,
  { label: string; color: string; bg: string; border: string; icon: string }
> = {
  Optimal: {
    label: "Optimal",
    color: "text-emerald-700 dark:text-emerald-300",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/40",
    icon: "✦",
  },
  Good: {
    label: "Good",
    color: "text-blue-700 dark:text-blue-300",
    bg: "bg-blue-500/10",
    border: "border-blue-500/40",
    icon: "▲",
  },
  Inaccurate: {
    label: "Inaccurate",
    color: "text-amber-700 dark:text-amber-300",
    bg: "bg-amber-500/10",
    border: "border-amber-500/40",
    icon: "?!",
  },
  Blunder: {
    label: "Blunder",
    color: "text-red-700 dark:text-red-300",
    bg: "bg-red-500/10",
    border: "border-red-500/40",
    icon: "✗",
  },
};

const DIFFICULTY_BADGE: Record<string, string> = {
  Easy: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  Medium: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  Hard: "bg-red-500/10 text-red-700 dark:text-red-300",
};

function parseAnalysis(raw: string): Partial<Analysis> {
  const get = (key: string) => {
    const match = raw.match(new RegExp(`${key}:\\s*(.+?)(?=\\n[A-Z]+:|$)`, "s"));
    return match ? match[1].trim() : undefined;
  };
  const ratingRaw = get("RATING");
  const validRatings: MoveQuality[] = ["Optimal", "Good", "Inaccurate", "Blunder"];
  const rating = validRatings.find((r) => ratingRaw?.includes(r));
  return {
    rating,
    summary: get("SUMMARY"),
    feedback: get("FEEDBACK"),
    hint: get("HINT"),
  };
}

// ---------------------------------------------------------------------------
// Sub-component: Analysis panel
// ---------------------------------------------------------------------------

function AnalysisPanel({
  analysis,
  streaming,
  error,
  hasCode,
}: {
  analysis: Partial<Analysis> | null;
  streaming: boolean;
  error: string | null;
  hasCode: boolean;
}) {
  if (error) {
    return (
      <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-700 dark:text-amber-300">
        <p className="font-medium mb-1">AI coach unavailable</p>
        <p className="text-xs opacity-80">{error}</p>
      </div>
    );
  }

  if (!hasCode) {
    return (
      <div className="rounded-xl border border-border bg-card p-5 text-sm text-muted text-center">
        <p className="text-2xl mb-2">🤖</p>
        <p>Start writing your solution and the AI coach will analyze your approach in real time.</p>
      </div>
    );
  }

  if (!analysis && streaming) {
    return (
      <div className="rounded-xl border border-border bg-card p-5 text-sm text-muted">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-brand animate-pulse" />
          Analyzing your approach…
        </div>
      </div>
    );
  }

  if (!analysis?.rating) return null;

  const cfg = RATING_CONFIG[analysis.rating];

  return (
    <div className={`rounded-xl border ${cfg.border} ${cfg.bg} p-4 space-y-3`}>
      {/* Rating badge */}
      <div className="flex items-center gap-2">
        <span className={`text-lg font-bold ${cfg.color}`}>{cfg.icon}</span>
        <span className={`text-sm font-semibold ${cfg.color}`}>{cfg.label}</span>
        {streaming && (
          <span className="ml-auto inline-block w-2 h-2 rounded-full bg-brand animate-pulse" />
        )}
      </div>

      {/* Summary */}
      {analysis.summary && (
        <p className="text-sm font-medium leading-snug">{analysis.summary}</p>
      )}

      {/* Feedback */}
      {analysis.feedback && (
        <p className="text-sm text-muted leading-relaxed">{analysis.feedback}</p>
      )}

      {/* Hint */}
      {analysis.hint && (
        <div className="rounded-lg border border-border bg-background/60 px-3 py-2">
          <p className="text-xs text-muted uppercase tracking-wide font-medium mb-1">Hint</p>
          <p className="text-sm">{analysis.hint}</p>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-component: Optimal solution reveal
// ---------------------------------------------------------------------------

function OptimalReveal({ problem }: { problem: CodingProblem }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="mt-4 rounded-xl border border-border bg-card overflow-hidden">
      <button
        onClick={() => setRevealed((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium hover:bg-foreground/5 transition-colors"
      >
        <span>View optimal solution</span>
        <span className="text-muted">{revealed ? "▲" : "▼"}</span>
      </button>
      {revealed && (
        <div className="border-t border-border px-4 pb-4 pt-3 space-y-3">
          <div className="rounded-lg bg-foreground/5 p-3">
            <p className="text-xs text-muted uppercase tracking-wide font-medium mb-1">
              Complexity
            </p>
            <p className="text-sm font-mono">{problem.optimalComplexity}</p>
          </div>
          <div>
            <p className="text-xs text-muted uppercase tracking-wide font-medium mb-2">
              Key insight
            </p>
            <p className="text-sm text-muted leading-relaxed">{problem.optimalExplanation}</p>
          </div>
          <div>
            <p className="text-xs text-muted uppercase tracking-wide font-medium mb-2">Solution</p>
            <pre className="rounded-lg bg-foreground/5 p-3 text-sm font-mono overflow-x-auto whitespace-pre">
              {problem.optimalSolution}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function CodeChallenge({ problem }: { problem: CodingProblem }) {
  const [code, setCode] = useState(problem.starterCode);
  const [analysis, setAnalysis] = useState<Partial<Analysis> | null>(null);
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastAnalyzed, setLastAnalyzed] = useState<string>("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const analyze = useCallback(
    async (currentCode: string) => {
      if (currentCode === lastAnalyzed) return;
      if (abortRef.current) abortRef.current.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setStreaming(true);
      setError(null);
      setLastAnalyzed(currentCode);

      try {
        const res = await fetch("/api/code-analysis", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            problemTitle: problem.title,
            problemDescription: problem.description,
            userCode: currentCode,
            optimalSolution: problem.optimalSolution,
            optimalComplexity: problem.optimalComplexity,
            language: problem.language,
          }),
          signal: controller.signal,
        });

        if (!res.ok) {
          const json = (await res.json()) as { error?: string };
          setError(json.error ?? "Analysis failed.");
          setStreaming(false);
          return;
        }

        if (!res.body) {
          setStreaming(false);
          return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let accumulated = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          accumulated += decoder.decode(value, { stream: true });
          setAnalysis(parseAnalysis(accumulated));
        }
      } catch (e) {
        if ((e as Error).name !== "AbortError") {
          setError("Could not reach the AI coach. Check your API key.");
        }
      } finally {
        setStreaming(false);
      }
    },
    [problem, lastAnalyzed],
  );

  // Debounce analysis: fire 1.5s after the user stops typing
  useEffect(() => {
    const isStub =
      code.trim() === problem.starterCode.trim() || code.trim().endsWith("pass");
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(
      () => {
        analyze(code);
      },
      isStub ? 0 : 1500,
    );
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [code, analyze, problem.starterCode]);

  const hasCode = code.trim() !== problem.starterCode.trim();

  return (
    <div className="grid lg:grid-cols-[1fr_360px] gap-6 items-start">
      {/* Left: problem + editor */}
      <div className="space-y-5">
        {/* Problem statement */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span
              className={`text-xs font-medium rounded-full px-2.5 py-1 ${DIFFICULTY_BADGE[problem.difficulty]}`}
            >
              {problem.difficulty}
            </span>
            {problem.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs rounded-full bg-foreground/5 text-muted px-2.5 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
          <h2 className="text-xl font-semibold mb-3">{problem.title}</h2>
          <Prose text={problem.description} />
        </div>

        {/* Editor */}
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-border">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Solution</span>
              <span className="text-xs text-muted bg-foreground/5 rounded px-1.5 py-0.5 font-mono">
                {problem.language}
              </span>
            </div>
            <button
              onClick={() => setCode(problem.starterCode)}
              className="text-xs text-muted hover:text-foreground transition-colors"
            >
              Reset
            </button>
          </div>
          <Editor
            height="360px"
            language={problem.language}
            value={code}
            onChange={(val) => setCode(val ?? "")}
            theme="vs-dark"
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              lineNumbers: "on",
              renderLineHighlight: "line",
              padding: { top: 12, bottom: 12 },
              fontFamily: "var(--font-mono), 'Fira Code', 'Cascadia Code', monospace",
              fontLigatures: true,
              wordWrap: "on",
              tabSize: 4,
            }}
          />
        </div>

        {/* Optimal reveal */}
        <OptimalReveal problem={problem} />
      </div>

      {/* Right: AI analysis */}
      <aside className="lg:sticky lg:top-20 space-y-4">
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="px-4 py-3 border-b border-border flex items-center gap-2">
            <span className="grid place-items-center w-7 h-7 rounded-lg bg-accent/15 text-accent text-base">
              ♟
            </span>
            <div>
              <p className="text-sm font-semibold leading-tight">AI Coach</p>
              <p className="text-xs text-muted leading-tight">
                Live analysis · updates as you type
              </p>
            </div>
          </div>
          <div className="p-4">
            <AnalysisPanel
              analysis={analysis}
              streaming={streaming}
              error={error}
              hasCode={hasCode}
            />
          </div>
        </div>

        {/* Rating legend */}
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs text-muted font-medium uppercase tracking-wide mb-3">
            Rating scale
          </p>
          <div className="space-y-2">
            {(Object.entries(RATING_CONFIG) as [MoveQuality, (typeof RATING_CONFIG)[MoveQuality]][]).map(
              ([key, cfg]) => (
                <div key={key} className="flex items-center gap-2 text-xs">
                  <span className={`font-bold w-4 text-center ${cfg.color}`}>{cfg.icon}</span>
                  <span className={`font-medium ${cfg.color}`}>{cfg.label}</span>
                  <span className="text-muted">
                    {key === "Optimal" && "— matches the best approach"}
                    {key === "Good" && "— right direction, missing optimization"}
                    {key === "Inaccurate" && "— on track but has a flaw"}
                    {key === "Blunder" && "— fundamentally wrong approach"}
                  </span>
                </div>
              ),
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
