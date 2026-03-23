/**
 * MLB Stats API `season` query param (calendar year of the season).
 * Default **2025** for live HR totals. Override later, e.g. `VITE_MLB_SEASON=2026` in `.env.local`.
 */
export function getMlbSeason(): string {
  const fromEnv = import.meta.env.VITE_MLB_SEASON?.trim()
  if (fromEnv && /^\d{4}$/.test(fromEnv)) {
    return fromEnv
  }
  return '2025'
}
