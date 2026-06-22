import Link from "next/link";
import { notFound } from "next/navigation";
import { getSubject, subjects } from "@/lib/curriculum";

export function generateStaticParams() {
  return subjects.map((s) => ({ slug: s.slug }));
}

export default async function SubjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const subject = getSubject(slug);
  if (!subject) notFound();

  return (
    <div className="mx-auto max-w-4xl px-5 py-12">
      <Link href="/#subjects" className="text-sm text-muted hover:text-foreground">
        ← All subjects
      </Link>
      <div className="mt-4 flex items-center gap-3">
        <span className="text-4xl">{subject.emoji}</span>
        <h1 className="text-3xl font-bold tracking-tight">{subject.name}</h1>
      </div>
      <p className="mt-2 text-muted">{subject.blurb}</p>

      <div className="mt-8 space-y-4">
        {subject.paths.map((path) => (
          <div key={path.slug} className="rounded-2xl border border-border bg-card p-6">
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
              <span className="rounded-full bg-foreground/5 px-2.5 py-1">{path.provider}</span>
              <span className="rounded-full bg-foreground/5 px-2.5 py-1">{path.license}</span>
              <span className="rounded-full bg-foreground/5 px-2.5 py-1">
                ~{path.estimatedHours}h · {path.lessons.length} lessons
              </span>
            </div>
            <h2 className="mt-3 text-xl font-semibold">{path.title}</h2>
            <p className="mt-1 text-muted">{path.description}</p>

            <ol className="mt-5 space-y-2">
              {path.lessons.map((lesson, i) => (
                <li key={lesson.id}>
                  <Link
                    href={`/learn/${subject.slug}/${path.slug}/${lesson.id}`}
                    className="group flex items-center gap-3 rounded-xl border border-border px-4 py-3 hover:border-brand transition-colors"
                  >
                    <span className="grid place-items-center w-7 h-7 shrink-0 rounded-full bg-brand/10 text-brand text-sm font-medium">
                      {i + 1}
                    </span>
                    <span>
                      <span className="font-medium group-hover:text-brand transition-colors">
                        {lesson.title}
                      </span>
                      <span className="block text-sm text-muted">{lesson.summary}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>

            <Link
              href={`/learn/${subject.slug}/${path.slug}/${path.lessons[0].id}`}
              className="mt-5 inline-block rounded-full bg-brand text-white px-5 py-2.5 text-sm font-medium hover:bg-brand-ink transition-colors"
            >
              Start the path →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
