import TeamCard from './TeamCard'

type LeaderboardTeam = {
  teamName: string
  totalHr: number
  players: Array<{
    id: number
    name: string
    homeRuns: number
    isCounted: boolean
    draftPosition?: number
  }>
  subtitle?: string
}

type LeaderboardProps = {
  teams: LeaderboardTeam[]
}

function Leaderboard({ teams }: LeaderboardProps) {
  return (
    <section className="space-y-3 sm:space-y-4">
      {teams.map((team, index) => (
        <TeamCard
          key={team.teamName}
          rank={index + 1}
          teamName={team.teamName}
          totalHr={team.totalHr}
          players={team.players}
          isLeader={index === 0}
          subtitle={team.subtitle}
        />
      ))}
    </section>
  )
}

export default Leaderboard
