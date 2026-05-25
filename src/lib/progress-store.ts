import { STORAGE_KEY_PROGRESS } from '@/lib/constants';

/* ─── Progress external store (useSyncExternalStore) ─── */
let progressListeners: (() => void)[] = [];
let progressCache: Set<string> | null = null;

export function subscribeProgress(callback: () => void) {
  progressListeners.push(callback);
  return () => { progressListeners = progressListeners.filter(l => l !== callback); };
}

export function getProgressSnapshot(): Set<string> {
  if (progressCache === null) {
    progressCache = loadProgressFromStorage();
  }
  return progressCache;
}

const EMPTY_SET = new Set<string>();
export function getServerProgressSnapshot(): Set<string> {
  return EMPTY_SET;
}

export function updateProgress(updater: (prev: Set<string>) => Set<string>) {
  const prev = progressCache ?? new Set();
  const next = updater(prev);
  progressCache = next;
  saveProgressToStorage(next);
  progressListeners.forEach(l => l());
}

function loadProgressFromStorage(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROGRESS);
    if (raw) return new Set(JSON.parse(raw) as string[]);
  } catch { /* ignore */ }
  return new Set();
}

function saveProgressToStorage(set: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify([...set]));
  } catch { /* ignore */ }
}
