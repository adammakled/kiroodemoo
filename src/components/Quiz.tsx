"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import type { QuizQuestion } from "@/lib/types";
import {
  review,
  deckProgress,
  dueLabel,
  subscribeSrs,
  srsVersion,
  srsServerVersion,
} from "@/lib/srs";

type Phase = "answering" | "revealed" | "done";

export function Quiz({ questions }: { questions: QuizQuestion[] }) {
  const ids = useMemo(() => questions.map((q) => q.id), [questions]);

  const [i, setI] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [phase, setPhase] = useState<Phase>("answering");
  const [score, setScore] = useState(0);
  const [nextLabel, setNextLabel] = useState<string>("");

  // Subscribe to the SRS store. Returns -1 during SSR/first hydration render
  // (so progress is null and markup matches the server), then the real version.
  const version = useSyncExternalStore(subscribeSrs, srsVersion, srsServerVersion);
  const progress = version < 0 ? null : deckProgress(ids);

  const q = questions[i];

  function submit() {
    if (selected === null) return;
    const correct = selected === q.answer;
    if (correct) setScore((s) => s + 1);
    const card = review(q.id, correct); // write() notifies the store → re-render
    setNextLabel(dueLabel(card));
    setPhase("revealed");
  }

  function next() {
    if (i < questions.length - 1) {
      setI((n) => n + 1);
      setSelected(null);
      setPhase("answering");
    } else {
      setPhase("done");
    }
  }

  function restart() {
    setI(0);
    setSelected(null);
    setScore(0);
    setPhase("answering");
  }

  if (phase === "done") {
    return (
      <div className="text-center py-6">
        <div className="text-3xl font-bold">
          {score}/{questions.length}
        </div>
        <p className="mt-1 text-muted">
          Answers saved to your spaced-repetition schedule — come back when they&apos;re due to lock
          them in.
        </p>
        {progress && (
          <p className="mt-2 text-sm text-accent">
            {progress.learned} learned · {progress.due} due now
          </p>
        )}
        <button
          onClick={restart}
          className="mt-5 rounded-full border border-border px-5 py-2 text-sm font-medium hover:border-brand transition-colors"
        >
          Review again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between text-xs text-muted mb-3">
        <span>
          Question {i + 1} of {questions.length}
        </span>
        {progress && <span>{progress.learned}/{progress.total} learned</span>}
      </div>

      {/* progress bar */}
      <div className="h-1.5 w-full rounded-full bg-foreground/8 mb-5 overflow-hidden">
        <div
          className="h-full bg-brand transition-all"
          style={{ width: `${(i / questions.length) * 100}%` }}
        />
      </div>

      <p className="font-medium text-lg">{q.prompt}</p>

      <div className="mt-4 space-y-2">
        {q.choices.map((choice, idx) => {
          const isSelected = selected === idx;
          const isAnswer = idx === q.answer;
          const revealed = phase === "revealed";

          let cls = "border-border hover:border-brand";
          if (revealed && isAnswer) cls = "border-accent bg-accent/10";
          else if (revealed && isSelected && !isAnswer) cls = "border-red-400 bg-red-400/10";
          else if (isSelected) cls = "border-brand bg-brand/5";

          return (
            <button
              key={idx}
              disabled={revealed}
              onClick={() => setSelected(idx)}
              className={`w-full text-left rounded-xl border px-4 py-3 transition-colors ${cls} disabled:cursor-default`}
            >
              {choice}
            </button>
          );
        })}
      </div>

      {phase === "revealed" && (
        <div className="mt-4 rounded-xl bg-foreground/5 p-4 text-sm">
          <p className="font-medium">
            {selected === q.answer ? "✅ Correct" : "❌ Not quite"} · next review {nextLabel}
          </p>
          <p className="mt-1 text-muted">{q.explanation}</p>
        </div>
      )}

      <div className="mt-5 flex justify-end">
        {phase === "answering" ? (
          <button
            onClick={submit}
            disabled={selected === null}
            className="rounded-full bg-brand text-white px-6 py-2.5 text-sm font-medium hover:bg-brand-ink transition-colors disabled:opacity-40"
          >
            Check answer
          </button>
        ) : (
          <button
            onClick={next}
            className="rounded-full bg-brand text-white px-6 py-2.5 text-sm font-medium hover:bg-brand-ink transition-colors"
          >
            {i < questions.length - 1 ? "Next →" : "Finish"}
          </button>
        )}
      </div>
    </div>
  );
}
