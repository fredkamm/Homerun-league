import { getMlbSeason } from './mlbSeason'

const LEADERS_URL = 'https://statsapi.mlb.com/api/v1/stats/leaders'

export type HomeRunLeaderRow = {
  id: number
  name: string
  homeRuns: number
}

type MlbLeadersResponse = {
  leagueLeaders?: Array<{
    leaders?: Array<{
      value?: string
      person?: {
        id?: number
        fullName?: string
      }
    }>
  }>
}

/**
 * Season HR leaders (regular season), highest first. Used to build the Undrafted team.
 */
export async function fetchHomeRunLeaders(season: string, limit: number): Promise<HomeRunLeaderRow[]> {
  const params = new URLSearchParams({
    leaderCategories: 'homeRuns',
    season,
    statGroup: 'hitting',
    statType: 'season',
    limit: String(limit),
  })

  try {
    const response = await fetch(`${LEADERS_URL}?${params}`)
    if (!response.ok) {
      return []
    }

    const data = (await response.json()) as MlbLeadersResponse
    const rows = data.leagueLeaders?.[0]?.leaders ?? []

    const out: HomeRunLeaderRow[] = []
    for (const row of rows) {
      const id = row.person?.id
      const name = row.person?.fullName
      const hr = row.value != null ? Number.parseInt(String(row.value), 10) : Number.NaN
      if (id == null || name == null || !Number.isFinite(hr)) {
        continue
      }
      out.push({ id, name, homeRuns: hr })
    }
    return out
  } catch {
    return []
  }
}

export function pickUndraftedByHomeRuns(
  leaders: HomeRunLeaderRow[],
  draftedPlayerIds: Set<number>,
  count: number,
): HomeRunLeaderRow[] {
  const picked: HomeRunLeaderRow[] = []
  for (const row of leaders) {
    if (draftedPlayerIds.has(row.id)) {
      continue
    }
    picked.push(row)
    if (picked.length >= count) {
      break
    }
  }
  return picked
}

/** Uses current app season from env / default */
export async function fetchUndraftedHomeRunHitters(
  draftedPlayerIds: Set<number>,
  count: number,
  leaderPoolLimit: number,
): Promise<HomeRunLeaderRow[]> {
  const season = getMlbSeason()
  const leaders = await fetchHomeRunLeaders(season, leaderPoolLimit)
  return pickUndraftedByHomeRuns(leaders, draftedPlayerIds, count)
}
