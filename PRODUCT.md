# OpenLearn — Free education for everyone

> Working name. An open-source platform that centralizes the best **free, openly-licensed**
> education across subjects, adds **curated learning paths**, **spaced-repetition quizzes**,
> and an **AI Socratic tutor** that tests your understanding instead of just answering.

## Mission
Make a high-quality education accessible to anyone with a connection — and as much as possible,
to those without a good one. Free, open source, no paywalls, no ads.

## Why this, why now
Great material already exists (CS50, MIT OCW, OpenStax, Khan Academy) but it is scattered,
unsequenced, and passive. The value we add is **curation + structure + active recall + a tutor**.
LLMs make a personal Socratic tutor finally affordable at scale.

---

## Content model — Hybrid (decided)
- **Host** material that is openly licensed (Creative Commons), with attribution.
  - Flagship: **CS50** (CC BY-NC-SA) → legal to host/remix non-commercially with credit.
  - Plus **MIT OpenCourseWare**, **OpenStax** textbooks, **freeCodeCamp**, **Wikiversity**, **OER Commons**.
- **Link out** to everything else (e.g. arbitrary YouTube lectures) rather than rehosting.
- Every resource carries an explicit `license` + `attribution` field. No license = link only.

## The three pillars
1. **Curated learning paths** (foundation) — sequenced journeys, not a pile of links.
   Curation is the moat; paths are version-controlled and community-contributable (GitHub-style PRs).
2. **AI Socratic tutor** (headline differentiator) — asks *you* questions, runs adaptive
   diagnostics, grades "explain it back to me" answers. **Grounded in the lesson material (RAG)**
   to reduce hallucination.
3. **Spaced-repetition quizzes** (retention engine) — per-lesson quizzes scheduled with an
   SM-2-style algorithm; the single most evidence-backed learning technique.

---

## MVP scope (this prototype)
Prove the full loop on **one flagship subject** end-to-end:

- One subject: **Computer Science**, one curated path using CS50's CC-licensed content.
- Lesson view: hosted/linked material + attribution.
- **Spaced-repetition quiz** per lesson (client-side, localStorage — no account needed yet).
- **AI Socratic tutor** panel grounded in the current lesson's content.
- Catalog/landing communicating the mission + other subjects as "coming soon / contribute".

Deliberately **out of MVP**: accounts, server-side progress sync, community contribution UI,
i18n, certificates, offline PWA. All are on the roadmap below.

## Roadmap
**Phase 1 — Prototype (now):** core loop on CS flagship; localStorage progress; AI tutor.
**Phase 2 — Breadth + accounts:** auth, server-side progress + SRS sync, 5–10 subjects,
AI-generated + human-vetted quizzes, search.
**Phase 3 — Community:** learning paths as reviewable contributions, Anki-style shared decks,
moderation, reporting dead links.
**Phase 4 — Access for all:** i18n (UI + tutor), offline/low-bandwidth PWA, a11y pass,
verifiable certificates.

## Key risks & mitigations
- **Licensing** → per-resource license metadata; host only CC, link the rest.
- **AI cost at scale** → small/cheap models for routine tutoring, response caching, rate limits,
  optional bring-your-own-key.
- **AI accuracy** → ground the tutor in lesson content (RAG); Socratic prompting reduces
  authoritative-but-wrong answers.
- **Content rot** → link-health checks + community reporting (Phase 3).
- **Curation doesn't scale** → community PR model for paths (Phase 3).

## Tech
- Next.js (App Router) + React + Tailwind.
- AI tutor via the **Vercel AI SDK** + **AI Gateway** (`provider/model` strings) — provider-swappable.
- Phase 2+: Postgres (via Vercel Marketplace) for accounts/progress; vector store for RAG grounding.
