/** How many roster HR totals count toward team score (top N by HR, with roster-order tiebreak). */
export const COUNTED_ROSTER_SPOTS = 4

export type RosterPlayerInput = {
  id: number
  name: string
  homeRuns: number
  /** List order (0 = first in array); lower wins ties at same HR. Not derived from `draftPosition`. */
  rosterIndex: number
  /** Draft position for UI only; ignored for sorting and totals. */
  draftPosition?: number
}

export type RosterPlayerForDisplay = {
  id: number
  name: string
  homeRuns: number
  isCounted: boolean
  /** Draft position for display; omitted when not applicable (e.g. Undrafted). */
  draftPosition?: number
}

/**
 * Sort by HR desc, then roster index asc (5th roster slot loses ties).
 * First `COUNTED_ROSTER_SPOTS` players are counted toward `totalHr`.
 */
export function buildRosterWithTopNCounting(
  items: RosterPlayerInput[],
  countedSize: number = COUNTED_ROSTER_SPOTS,
): { players: RosterPlayerForDisplay[]; totalHr: number } {
  const sorted = [...items].sort(
    (a, b) => b.homeRuns - a.homeRuns || a.rosterIndex - b.rosterIndex,
  )
  const n = Math.min(countedSize, sorted.length)
  const totalHr = sorted.slice(0, n).reduce((sum, p) => sum + p.homeRuns, 0)
  const players: RosterPlayerForDisplay[] = sorted.map((p, i) => ({
    id: p.id,
    name: p.name,
    homeRuns: p.homeRuns,
    isCounted: i < n,
    draftPosition: p.draftPosition,
  }))
  return { players, totalHr }
}
