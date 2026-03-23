/**
 * Sample fantasy league — replace with your real league when ready.
 *
 * Structure:
 * - 9 teams × 5 players each (45 roster spots total).
 * - Each team: `teamName` + `players` array.
 * - Each player: `id` = MLB Stats API people id, `name` = display label (can differ from API).
 *
 * To swap in real rosters: edit `teamName` and each `{ id, name }` under `players`.
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
    teamName: 'Team 1',
    players: [
      { id: 592450, name: 'Aaron Judge' },
      { id: 624413, name: 'Pete Alonso' },
      { id: 608070, name: 'Jose Ramirez' },
      { id: 518692, name: 'Freddie Freeman' },
      { id: 605141, name: 'Mookie Betts' },
    ],
  },
  {
    teamName: 'Team 2',
    players: [
      { id: 660271, name: 'Shohei Ohtani' },
      { id: 547180, name: 'Bryce Harper' },
      { id: 646240, name: 'Rafael Devers' },
      { id: 592518, name: 'Manny Machado' },
      { id: 502671, name: 'Paul Goldschmidt' },
    ],
  },
  {
    teamName: 'Team 3',
    players: [
      { id: 660670, name: 'Ronald Acuna Jr.' },
      { id: 545361, name: 'Mike Trout' },
      { id: 665487, name: 'Fernando Tatis Jr.' },
      { id: 665489, name: 'Vladimir Guerrero Jr.' },
      { id: 666182, name: 'Bo Bichette' },
    ],
  },
  {
    teamName: 'Team 4',
    players: [
      { id: 543760, name: 'Marcus Semien' },
      { id: 677594, name: 'Julio Rodriguez' },
      { id: 672695, name: 'Corbin Carroll' },
      { id: 683002, name: 'Gunnar Henderson' },
      { id: 677951, name: 'Bobby Witt Jr.' },
    ],
  },
  {
    teamName: 'Team 5',
    players: [
      { id: 670541, name: 'Yordan Alvarez' },
      { id: 663656, name: 'Kyle Tucker' },
      { id: 608324, name: 'Alex Bregman' },
      { id: 621566, name: 'Matt Olson' },
      { id: 663586, name: 'Austin Riley' },
    ],
  },
  {
    teamName: 'Team 6',
    players: [
      { id: 571448, name: 'Nolan Arenado' },
      { id: 596019, name: 'Francisco Lindor' },
      { id: 607208, name: 'Trea Turner' },
      { id: 608369, name: 'Corey Seager' },
      { id: 656305, name: 'Matt Chapman' },
    ],
  },
  {
    teamName: 'Team 7',
    players: [
      { id: 665742, name: 'Juan Soto' },
      { id: 669394, name: 'Adley Rutschman' },
      { id: 666971, name: 'Oneil Cruz' },
      { id: 668942, name: 'Josh Jung' },
      { id: 682998, name: 'Elly De La Cruz' },
    ],
  },
  {
    teamName: 'Team 8',
    players: [
      { id: 676929, name: 'Spencer Torkelson' },
      { id: 656941, name: 'Kyle Schwarber' },
      { id: 669477, name: 'William Contreras' },
      { id: 671218, name: 'Luis Robert Jr.' },
      { id: 665862, name: 'Randy Arozarena' },
    ],
  },
  {
    teamName: 'Team 9',
    players: [
      { id: 669064, name: 'Austin Hays' },
      { id: 669004, name: 'Andrew Vaughn' },
      { id: 650333, name: 'Jose Altuve' },
      { id: 672580, name: 'Anthony Volpe' },
      { id: 663853, name: 'CJ Abrams' },
    ],
  },
]
