type PlayerRowProps = {
  playerName: string
  homeRuns: number
  /** When false, this player's HR does not count toward the team total (5th roster spot / tiebreak). */
  isCounted: boolean
  /** Draft position (e.g. round.pick), display only. Omit for Undrafted. */
  draftPosition?: number
}

function PlayerRow({ playerName, homeRuns, isCounted, draftPosition }: PlayerRowProps) {
  const pickLabel = draftPosition != null ? String(draftPosition) : ''
  const draftedNote = pickLabel ? `Drafted ${pickLabel}. ` : ''

  return (
    <li
      className={`flex min-h-[2.75rem] items-center gap-2 rounded-lg border px-2.5 py-2.5 sm:min-h-0 sm:gap-3 sm:px-3 sm:py-2 ${
        isCounted
          ? 'border-emerald-500/35 bg-emerald-950/25'
          : 'border-slate-800/60 bg-slate-900/40 opacity-60'
      }`}
      aria-label={`${draftedNote}${playerName}, ${homeRuns} home runs${isCounted ? ', counts toward total' : ', not counted toward total'}`}
    >
      <div className="flex min-w-0 flex-1 items-baseline gap-1.5 sm:gap-2">
        <span
          className={`min-w-0 truncate text-sm ${isCounted ? 'font-medium text-slate-100' : 'text-slate-400'}`}
          title={playerName}
        >
          {playerName}
        </span>
        {draftPosition != null ? (
          <span
            className="shrink-0 text-[11px] font-medium tabular-nums text-slate-500/40 sm:text-xs sm:text-slate-400/45"
            title={`Draft position ${pickLabel}`}
          >
            Drafted: {pickLabel}
          </span>
        ) : null}
      </div>
      <span
        className={`shrink-0 text-sm font-semibold tabular-nums ${isCounted ? 'text-emerald-300' : 'text-slate-500'}`}
      >
        {homeRuns} HR
      </span>
    </li>
  )
}

export default PlayerRow
