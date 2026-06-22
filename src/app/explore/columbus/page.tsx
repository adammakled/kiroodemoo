import Link from "next/link";
import { ColumbusGlobeExplorer } from "@/components/ColumbusGlobeExplorer";

export const metadata = {
  title: "Columbus's Voyages — Interactive Globe · OpenLearn",
  description:
    "Follow Christopher Columbus across four Atlantic voyages on an interactive 3-D globe. " +
    "Explore every stop from Palos de la Frontera to the South American mainland.",
};

export default function ColumbusExplorePage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      {/* back link */}
      <Link
        href="/subjects/history"
        className="text-sm text-muted hover:text-foreground transition-colors"
      >
        ← History
      </Link>

      {/* hero */}
      <div className="mt-4 mb-10">
        <h1 className="text-3xl font-bold tracking-tight">
          Columbus&apos;s Four Voyages
        </h1>
        <p className="mt-2 text-muted max-w-2xl">
          Between 1492 and 1504, Christopher Columbus made four Atlantic crossings that permanently
          connected two hemispheres. Spin the globe, hover each stop, and follow the routes
          voyage by voyage.
        </p>
      </div>

      <ColumbusGlobeExplorer />

      {/* continue to lessons */}
      <div className="mt-12 rounded-2xl border border-border bg-card p-6">
        <h2 className="font-semibold text-lg">Ready to go deeper?</h2>
        <p className="mt-1 text-sm text-muted">
          The Columbus &amp; Age of Exploration path walks through each voyage with primary
          sources, analysis, and spaced-repetition quizzes.
        </p>
        <Link
          href="/learn/history/columbus-voyages/background"
          className="mt-4 inline-block rounded-full bg-brand text-white px-5 py-2.5 text-sm font-medium hover:bg-brand-ink transition-colors"
        >
          Start the learning path →
        </Link>
      </div>
    </div>
  );
}
