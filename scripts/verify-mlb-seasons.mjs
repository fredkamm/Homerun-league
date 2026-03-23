/**
 * Verifies MLB Stats API responses for sample player IDs:
 * - 2025: expect non-zero HR for known sluggers (season complete / in progress in API).
 * - 2026: logs HR (often 0 before regular season stats exist).
 *
 * Run: node scripts/verify-mlb-seasons.mjs
 */

const BASE = 'https://statsapi.mlb.com/api/v1/people'

/** Sample IDs from mockLeague (subset) */
const SAMPLE = [
  { id: 592450, name: 'Aaron Judge' },
  { id: 660271, name: 'Shohei Ohtani' },
  { id: 624413, name: 'Pete Alonso' },
]

async function fetchSeasonHr(playerId, season) {
  const url = `${BASE}/${playerId}/stats?stats=season&season=${season}&group=hitting`
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`${season} ${playerId}: HTTP ${res.status}`)
  }
  const data = await res.json()
  const hr = data.stats?.[0]?.splits?.[0]?.stat?.homeRuns
  return typeof hr === 'number' ? hr : null
}

function assert(condition, message) {
  if (!condition) {
    console.error('FAIL:', message)
    process.exit(1)
  }
}

console.log('MLB Stats API — season verification\n')

let any2025Positive = false
for (const p of SAMPLE) {
  const hr = await fetchSeasonHr(p.id, '2025')
  console.log(`2025  ${p.name.padEnd(22)} id=${p.id}  HR=${hr ?? '—'}`)
  if (hr != null && hr > 0) any2025Positive = true
}

assert(any2025Positive, 'Expected at least one 2025 HR total > 0 (API or parsing issue).')
console.log('\nOK: 2025 sample data shows home run totals.\n')

console.log('2026 (current-year target; may be 0 or empty pre-season):\n')
for (const p of SAMPLE) {
  const hr = await fetchSeasonHr(p.id, '2026')
  console.log(`2026  ${p.name.padEnd(22)} id=${p.id}  HR=${hr ?? 0}`)
}

console.log('\nDone. App default season is 2025; set VITE_MLB_SEASON=2026 in .env.local when 2026 stats are available.')
