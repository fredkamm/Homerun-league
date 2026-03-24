/**
 * Sample fantasy league — replace with your real league when ready.
 *
 * Structure:
 * - 9 fantasy teams × 5 players each (45 roster spots total).
 * - Each team: `teamName` + `players` array.
 * - A tenth **Undrafted** team is built in the app from MLB HR leaders (not listed here).
 * - Each player: `id` = MLB Stats API people id, `name` = display label (can differ from API).
 *
 * Prototype roster: players were **randomly shuffled and chunked**, then the three strongest
 * groups (by 2025 HR sum) were assigned so **Dillion C.** gets the highest total and the **top three
 * team totals stay within ~25 HR** of each other (live API totals may shift slightly by season).
 *
 * IDs must match https://statsapi.mlb.com/api/v1/people/{id}/...
 *
 * Season for HR totals: app default is **2025** (`getMlbSeason()`). Set `VITE_MLB_SEASON=2026`
 * in `.env.local` when that season has stats in the API.
 */

export type FantasyPlayer = {
  id: number
  name: string
}

export type FantasyTeam = {
  teamName: string
  players: FantasyPlayer[]
}

/** Placeholder team names — replace with your league’s names. */
export const mockLeague: FantasyTeam[] = [
  {
    teamName: 'Fred K.',
    players: [
      { id: 676929, name: 'Spencer Torkelson' },
      { id: 663656, name: 'Kyle Tucker' },
      { id: 663586, name: 'Austin Riley' },
      { id: 672695, name: 'Corbin Carroll' },
      { id: 669477, name: 'William Contreras' },
    ],
  },
  {
    teamName: 'Dillion C.',
    players: [
      { id: 608070, name: 'Jose Ramirez' },
      { id: 665487, name: 'Fernando Tatis Jr.' },
      { id: 656305, name: 'Matt Chapman' },
      { id: 608324, name: 'Alex Bregman' },
      { id: 592450, name: 'Aaron Judge' },
    ],
  },
  {
    teamName: 'Jeff L.',
    players: [
      { id: 605141, name: 'Mookie Betts' },
      { id: 665489, name: 'Vladimir Guerrero Jr.' },
      { id: 682998, name: 'Elly De La Cruz' },
      { id: 665742, name: 'Juan Soto' },
      { id: 663853, name: 'CJ Abrams' },
    ],
  },
  {
    teamName: 'Brett K.',
    players: [
      { id: 677951, name: 'Bobby Witt Jr.' },
      { id: 683002, name: 'Gunnar Henderson' },
      { id: 624413, name: 'Pete Alonso' },
      { id: 608369, name: 'Corey Seager' },
      { id: 660670, name: 'Ronald Acuna Jr.' },
    ],
  },
  {
    teamName: 'Mike B.',
    players: [
      { id: 669064, name: 'Austin Hays' },
      { id: 543760, name: 'Marcus Semien' },
      { id: 621566, name: 'Matt Olson' },
      { id: 665862, name: 'Randy Arozarena' },
      { id: 672580, name: 'Anthony Volpe' },
    ],
  },
  {
    teamName: 'Mike T.',
    players: [
      { id: 545361, name: 'Mike Trout' },
      { id: 670541, name: 'Yordan Alvarez' },
      { id: 607208, name: 'Trea Turner' },
      { id: 666182, name: 'Bo Bichette' },
      { id: 502671, name: 'Paul Goldschmidt' },
    ],
  },
  {
    teamName: 'Brian E.',
    players: [
      { id: 571448, name: 'Nolan Arenado' },
      { id: 650333, name: 'Jose Altuve' },
      { id: 592518, name: 'Manny Machado' },
      { id: 671218, name: 'Luis Robert Jr.' },
      { id: 656941, name: 'Kyle Schwarber' },
    ],
  },
  {
    teamName: 'Nick M.',
    players: [
      { id: 669394, name: 'Adley Rutschman' },
      { id: 646240, name: 'Rafael Devers' },
      { id: 547180, name: 'Bryce Harper' },
      { id: 669004, name: 'Andrew Vaughn' },
      { id: 518692, name: 'Freddie Freeman' },
    ],
  },
  {
    teamName: 'Joe C.',
    players: [
      { id: 596019, name: 'Francisco Lindor' },
      { id: 666971, name: 'Oneil Cruz' },
      { id: 660271, name: 'Shohei Ohtani' },
      { id: 668942, name: 'Josh Jung' },
      { id: 677594, name: 'Julio Rodriguez' },
    ],
  },
]
