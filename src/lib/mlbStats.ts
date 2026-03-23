import { getMlbSeason } from './mlbSeason'

const MLB_API_BASE = 'https://statsapi.mlb.com/api/v1/people'

type MlbPlayerStatsResponse = {
  stats?: Array<{
    splits?: Array<{
      stat?: {
        homeRuns?: number
      }
    }>
  }>
}

export async function fetchPlayerHomeRuns(playerId: number): Promise<number> {
  const season = getMlbSeason()
  const endpoint = `${MLB_API_BASE}/${playerId}/stats?stats=season&season=${season}&group=hitting`

  try {
    const response = await fetch(endpoint)
    if (!response.ok) {
      return 0
    }

    const data = (await response.json()) as MlbPlayerStatsResponse
    return data.stats?.[0]?.splits?.[0]?.stat?.homeRuns ?? 0
  } catch {
    return 0
  }
}
