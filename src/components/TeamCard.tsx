import { useState } from 'react'
import PlayerRow from './PlayerRow'

type TeamCardPlayer = {
  id: number
  name: string
  homeRuns: number
}

type TeamCardProps = {
  rank: number
  teamName: string
  totalHr: number
  players: TeamCardPlayer[]
  isLeader: boolean
  /** e.g. Undrafted team explanation */
  subtitle?: string
  /** When false, hide standings rank (e.g. Undrafted row) */
  showRank?: boolean
}

function TeamCard({
  rank,
  teamName,
  totalHr,
  players,
  isLeader,
  subtitle,
  showRank = true,
}: TeamCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <article
      className={`min-w-0 rounded-2xl border p-4 shadow-lg transition sm:p-5 ${
        isLeader
          ? 'border-emerald-400/40 bg-emerald-500/10'
          : 'border-slate-800 bg-slate-900/80'
      }`}
    >
      <button
        type="button"
        onClick={() => setIsExpanded((open) => !open)}
        aria-expanded={isExpanded}
        className="flex w-full min-h-[3rem] touch-manipulation items-center gap-3 rounded-xl text-left outline-none ring-emerald-400/40 focus-visible:ring-2 sm:min-h-0 sm:gap-4"
      >
        <div className="min-w-0 flex-1">
          {showRank ? (
            <p className="text-xs uppercase tracking-wider text-slate-400">#{rank}</p>
          ) : null}
          <h2 className="text-lg font-semibold leading-snug text-slate-100 sm:text-xl">{teamName}</h2>
          {subtitle ? (
            <p className="mt-1 text-xs leading-relaxed text-slate-500">{subtitle}</p>
          ) : null}
        </div>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <div className="text-right">
            <p className="text-xs uppercase tracking-wider text-slate-400">Total HR</p>
            <p className="text-xl font-bold tabular-nums text-emerald-300 sm:text-2xl">{totalHr}</p>
          </div>
          <span
            className={`inline-block text-slate-500 transition-transform duration-200 ${
              isExpanded ? 'rotate-180' : ''
            }`}
            aria-hidden
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
      </button>

      {isExpanded ? (
        players.length > 0 ? (
          <ul className="mt-3 space-y-2 sm:mt-4">
            {players.map((player) => (
              <PlayerRow key={player.id} playerName={player.name} homeRuns={player.homeRuns} />
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-slate-500 sm:mt-4">No players loaded.</p>
        )
      ) : null}
    </article>
  )
}

export default TeamCard
