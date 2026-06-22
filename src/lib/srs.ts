// A small SM-2-style spaced-repetition scheduler, persisted in localStorage.
// No account required — this keeps the MVP zero-friction. Phase 2 syncs this
// to the server per-user.

export interface CardState {
  /** Question id. */
  id: string;
  /** Ease factor (SM-2). Starts at 2.5, floored at 1.3. */
  ease: number;
  /** Current interval in days. */
  interval: number;
  /** Consecutive correct streak. */
  reps: number;
  /** Epoch ms when this card is next due. */
  due: number;
}

const KEY = "openlearn:srs:v1";

type Store = Record<string, CardState>;

function read(): Store {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(KEY) ?? "{}") as Store;
  } catch {
    return {};
  }
}

// External-store plumbing so React components can subscribe via
// useSyncExternalStore (SSR-safe, no setState-in-effect).
let version = 0;
const listeners = new Set<() => void>();

function notify() {
  version += 1;
  listeners.forEach((l) => l());
}

/** Subscribe to SRS changes. Returns an unsubscribe function. */
export function subscribeSrs(cb: () => void): () => void {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

/** Stable client snapshot — bumps on every write. */
export function srsVersion(): number {
  return version;
}

/** Server snapshot sentinel — means "don't read localStorage yet". */
export function srsServerVersion(): number {
  return -1;
}

function write(store: Store) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(store));
  notify();
}

const DAY = 24 * 60 * 60 * 1000;

export function getCard(id: string): CardState | undefined {
  return read()[id];
}

/** True if the card is new or due now. */
export function isDue(id: string, now = Date.now()): boolean {
  const card = read()[id];
  return !card || card.due <= now;
}

/**
 * Record a review. `correct` maps to an SM-2 grade of 5 (right) or 2 (wrong).
 * Returns the updated card so callers can show the next due date.
 */
export function review(id: string, correct: boolean, now = Date.now()): CardState {
  const store = read();
  const prev: CardState =
    store[id] ?? { id, ease: 2.5, interval: 0, reps: 0, due: now };

  let { ease, interval, reps } = prev;

  if (correct) {
    reps += 1;
    if (reps === 1) interval = 1;
    else if (reps === 2) interval = 6;
    else interval = Math.round(interval * ease);
    // Nudge ease up slightly for a confident correct answer.
    ease = Math.max(1.3, ease + 0.1);
  } else {
    reps = 0;
    interval = 0; // see again today
    ease = Math.max(1.3, ease - 0.2);
  }

  const next: CardState = {
    id,
    ease,
    interval,
    reps,
    due: now + interval * DAY,
  };
  store[id] = next;
  write(store);
  return next;
}

/** Human-friendly "next review" label. */
export function dueLabel(card: CardState, now = Date.now()): string {
  const days = Math.round((card.due - now) / DAY);
  if (days <= 0) return "today";
  if (days === 1) return "tomorrow";
  return `in ${days} days`;
}

export interface DeckProgress {
  total: number;
  due: number;
  learned: number; // reps >= 1 and not due
}

export function deckProgress(ids: string[], now = Date.now()): DeckProgress {
  const store = read();
  let due = 0;
  let learned = 0;
  for (const id of ids) {
    const card = store[id];
    if (!card || card.due <= now) due += 1;
    else if (card.reps >= 1) learned += 1;
  }
  return { total: ids.length, due, learned };
}
