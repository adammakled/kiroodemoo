import Link from "next/link";
import { notFound } from "next/navigation";
import { getProblem, codingPath } from "@/lib/challenges";
import { CodeChallenge } from "@/components/CodeChallenge";

export function generateStaticParams() {
  return codingPath.problems.map((p) => ({ problemId: p.id }));
}

export default async function ChallengePage({
  params,
}: {
  params: Promise<{ problemId: string }>;
}) {
  const { problemId } = await params;
  const problem = getProblem(problemId);
  if (!problem) notFound();

  const idx = codingPath.problems.findIndex((p) => p.id === problemId);
  const prev = idx > 0 ? codingPath.problems[idx - 1] : undefined;
  const next = idx < codingPath.problems.length - 1 ? codingPath.problems[idx + 1] : undefined;

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      {/* Breadcrumb */}
      <div className="text-sm text-muted flex items-center gap-2 flex-wrap">
        <Link href="/subjects/computer-science" className="hover:text-foreground">
          💻 Computer Science
        </Link>
        <span>/</span>
        <Link href="/challenges" className="hover:text-foreground">
          Coding Challenges
        </Link>
        <span>/</span>
        <span>{problem.title}</span>
      </div>

      <div className="mt-4 flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-sm text-brand font-medium">
            Problem {idx + 1} of {codingPath.problems.length}
          </p>
          <h1 className="mt-0.5 text-2xl font-bold tracking-tight">{problem.title}</h1>
        </div>
      </div>

      <div className="mt-6">
        <CodeChallenge problem={problem} />
      </div>

      {/* Navigation */}
      <nav className="mt-10 flex items-center justify-between gap-3">
        {prev ? (
          <Link
            href={`/challenges/${prev.id}`}
            className="rounded-full border border-border px-4 py-2 text-sm hover:border-brand transition-colors"
          >
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/challenges/${next.id}`}
            className="rounded-full bg-brand text-white px-4 py-2 text-sm font-medium hover:bg-brand-ink transition-colors"
          >
            {next.title} →
          </Link>
        ) : (
          <Link
            href="/challenges"
            className="rounded-full bg-brand text-white px-4 py-2 text-sm font-medium hover:bg-brand-ink transition-colors"
          >
            All challenges ✓
          </Link>
        )}
      </nav>
    </div>
  );
}
