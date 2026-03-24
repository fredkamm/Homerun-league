import { useEffect, useMemo, useState } from 'react'
import Leaderboard from './components/Leaderboard'
import TeamCard from './components/TeamCard'
import {
  HR_LEADERS_FETCH_LIMIT,
  UNDRAFTED_ROSTER_SIZE,
  UNDRAFTED_TEAM_NAME,
  UNDRAFTED_TEAM_SUBTITLE,
} from './data/leagueConstants'
import { mockLeague } from './data/mockLeague'
import { fetchUndraftedHomeRunHitters, type HomeRunLeaderRow } from './lib/mlbLeaders'
import { fetchPlayerHomeRuns } from './lib/mlbStats'
import { getMlbSeason } from './lib/mlbSeason'

function App() {
  const [playerHrById, setPlayerHrById] = useState<Record<number, number>>({})
  const [undraftedPlayers, setUndraftedPlayers] = useState<HomeRunLeaderRow[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<string | null>(null)

  useEffect(() => {
    const loadPlayerStats = async () => {
      setIsLoading(true)

      const playerIds = mockLeague.flatMap((team) => team.players.map((player) => player.id))
      const uniquePlayerIds = [...new Set(playerIds)]
      const draftedIds = new Set(uniquePlayerIds)

      const [hrResults, undrafted] = await Promise.all([
        Promise.all(
          uniquePlayerIds.map(async (playerId) => [playerId, await fetchPlayerHomeRuns(playerId)] as const),
        ),
        fetchUndraftedHomeRunHitters(draftedIds, UNDRAFTED_ROSTER_SIZE, HR_LEADERS_FETCH_LIMIT),
      ])

      const hrMap: Record<number, number> = {}
      hrResults.forEach(([playerId, homeRuns]) => {
        hrMap[playerId] = homeRuns
      })

      setPlayerHrById(hrMap)
      setUndraftedPlayers(undrafted)
      setLastUpdated(new Date().toLocaleTimeString())
      setIsLoading(false)
    }

    loadPlayerStats()
  }, [])

  const season = getMlbSeason()

  const standingsTeams = useMemo(() => {
    return mockLeague
      .map((team) => {
        const playersWithStats = team.players
          .map((player) => ({
            ...player,
            homeRuns: playerHrById[player.id] ?? 0,
          }))
          .sort((a, b) => b.homeRuns - a.homeRuns || a.name.localeCompare(b.name))

        const totalHr = playersWithStats.reduce((sum, player) => sum + player.homeRuns, 0)

        return {
          teamName: team.teamName,
          players: playersWithStats,
          totalHr,
        }
      })
      .sort((a, b) => b.totalHr - a.totalHr)
  }, [playerHrById])

  const undraftedForCard = useMemo(() => {
    const players = undraftedPlayers
      .map((p) => ({
        id: p.id,
        name: p.name,
        homeRuns: p.homeRuns,
      }))
      .sort((a, b) => b.homeRuns - a.homeRuns || a.name.localeCompare(b.name))
    const totalHr = players.reduce((sum, p) => sum + p.homeRuns, 0)
    return { players, totalHr }
  }, [undraftedPlayers])

  const leagueTotalHr = useMemo(() => {
    const fantasySum = standingsTeams.reduce((sum, t) => sum + t.totalHr, 0)
    return fantasySum + undraftedForCard.totalHr
  }, [standingsTeams, undraftedForCard.totalHr])

  const showPreseasonHint = !isLoading && season === '2026' && leagueTotalHr === 0

  return (
    <main className="mx-auto flex min-h-[100dvh] min-h-screen w-full max-w-3xl flex-1 flex-col justify-start px-3 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))] sm:justify-center sm:px-4 sm:py-10 sm:pb-10 sm:pt-10">
      <section className="flex w-full min-w-0 flex-1 flex-col rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-2xl backdrop-blur sm:rounded-3xl sm:p-6">
        <header className="mb-5 flex flex-col gap-2 sm:mb-6 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-widest text-slate-400">Fantasy Baseball</p>
            <h1 className="text-2xl font-bold leading-tight text-slate-100 sm:text-3xl md:text-4xl">
              Home Run Leaderboard
            </h1>
            <p className="mt-1 text-sm text-slate-500">{season} season (MLB Stats API)</p>
          </div>
          <p className="shrink-0 text-xs text-slate-400 sm:text-right">
            {lastUpdated ? `Updated ${lastUpdated}` : 'Loading live stats'}
          </p>
        </header>

        {showPreseasonHint ? (
          <div className="mb-4 rounded-xl border border-sky-500/30 bg-sky-500/10 px-3 py-2 text-xs leading-relaxed text-sky-100">
            You are loading <strong>2026</strong> season stats, but the API may not have regular-season
            hitting totals yet (everything shows 0). Use default <strong>2025</strong> or remove{' '}
            <code className="rounded bg-slate-800 px-1 py-0.5 text-sky-200">VITE_MLB_SEASON=2026</code>{' '}
            from <code className="rounded bg-slate-800 px-1 py-0.5">.env.local</code> and restart{' '}
            <code className="rounded bg-slate-800 px-1 py-0.5">npm run dev</code>.
          </div>
        ) : null}

        {isLoading ? (
          <div className="space-y-3 sm:space-y-4">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="animate-pulse rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:p-5"
              >
                <div className="mb-3 h-4 w-20 rounded bg-slate-700" />
                <div className="mb-2 h-6 max-w-[11rem] rounded bg-slate-700" />
                <div className="h-4 w-28 rounded bg-slate-700" />
              </div>
            ))}
          </div>
        ) : standingsTeams.length > 0 ? (
          <div className="flex min-h-0 flex-1 flex-col">
            <div className="min-h-0 flex-1">
              <Leaderboard teams={standingsTeams} />
            </div>
            <div className="mt-auto shrink-0 border-t border-slate-700 pt-6">
              <p className="mb-3 text-xs font-medium uppercase tracking-wider text-slate-500">
                Undrafted — not in standings
              </p>
              <TeamCard
                rank={0}
                showRank={false}
                teamName={UNDRAFTED_TEAM_NAME}
                subtitle={UNDRAFTED_TEAM_SUBTITLE}
                totalHr={undraftedForCard.totalHr}
                players={undraftedForCard.players}
                isLeader={false}
              />
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm leading-relaxed text-amber-200">
            No teams available. Please check the league data and try again.
          </div>
        )}
      </section>
    </main>
  )
}

export default App
