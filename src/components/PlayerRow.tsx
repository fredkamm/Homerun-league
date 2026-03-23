type PlayerRowProps = {
  playerName: string
  homeRuns: number
}

function PlayerRow({ playerName, homeRuns }: PlayerRowProps) {
  return (
    <li className="flex min-h-[2.75rem] items-center justify-between gap-3 rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2.5 sm:min-h-0 sm:py-2">
      <span className="min-w-0 flex-1 truncate text-sm text-slate-200" title={playerName}>
        {playerName}
      </span>
      <span className="shrink-0 text-sm font-semibold tabular-nums text-emerald-300">{homeRuns} HR</span>
    </li>
  )
}

export default PlayerRow
