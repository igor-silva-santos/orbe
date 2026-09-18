const sessionSyncedIds = new Map<string, Set<string>>();

export function trackSessionCrunchyrollId(sessionId: string, crunchyrollId: string): void {
  let set = sessionSyncedIds.get(sessionId);
  if (!set) {
    set = new Set();
    sessionSyncedIds.set(sessionId, set);
  }
  set.add(crunchyrollId);
}

export function getSessionSyncedIds(sessionId: string): string[] {
  const set = sessionSyncedIds.get(sessionId);
  return set ? Array.from(set) : [];
}

export function clearSessionSyncedIds(sessionId: string): void {
  sessionSyncedIds.delete(sessionId);
}
