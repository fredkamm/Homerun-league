/**
 * Sample fantasy league — replace with your real league when ready.
 *
 * Structure:
 * - 9 fantasy teams × 5 players each (45 roster spots total).
 * - Each team: `teamName` + `players` array.
 * - A tenth **Undrafted** team is built in the app from MLB HR leaders (not listed here).
 * - Each player: `id` = MLB Stats API people id, `name` = display label (can differ from API).
 * - `draftPosition` = where they were drafted (e.g. round.pick as 1.1, 2.9), **cards only**. Top-4 HR tiebreaks use **array index**, not this field.
 *
 * Prototype roster: players were **randomly shuffled and chunked**, then the three strongest
 * groups (by 2026 HR sum) were assigned so **Dillion C.** gets the highest total and the **top three
 * team totals stay within ~25 HR** of each other (live API totals may shift slightly by season).
 *
 * IDs must match https://statsapi.mlb.com/api/v1/people/{id}/...
 *
 * Season for HR totals: app default is **2026** (`getMlbSeason()`). Set `VITE_MLB_SEASON=2025`
 * in `.env.local` when that season has stats in the API.
 */

export type FantasyPlayer = {
  id: number
  name: string
  /** Draft slot / pick position for display (e.g. 1.1 = round 1, pick 1). */
  draftPosition: number
}

export type FantasyTeam = {
  teamName: string
  players: FantasyPlayer[]
}

/** Placeholder team names — replace with your league’s names. */
export const mockLeague: FantasyTeam[] = [
  {
    teamName: 'Mike T.',
    players: [
      { id: 592450, name: 'Aaron Judge', draftPosition: 1.1 },
      { id: 547180, name: 'Bryce Harper', draftPosition: 2.9 },
      { id: 606466, name: 'Ketel Marte', draftPosition: 3.1 },
      { id: 669127, name: 'Shea Langeliers', draftPosition: 4.9 },
      { id: 701350, name: 'Roman Anthony', draftPosition: 5.1 },
    ],
  },
  {
    teamName: 'Brian E.',
    players: [
      { id: 660271, name: 'Shohei Ohtani', draftPosition: 1.2 },
      { id: 621439, name: 'Byron Buxton', draftPosition: 2.8 },
      { id: 660670, name: 'Ronald Acuña Jr.', draftPosition: 3.2 },
      { id: 596019, name: 'Francisco Lindor', draftPosition: 4.8 },
      { id: 666969, name: 'Adolis García', draftPosition: 5.2 },
    ],
  },
  {
    teamName: 'Jeff L.',
    players: [
      { id: 656941, name: 'Kyle Schwarber', draftPosition: 1.3 },
      { id: 670541, name: 'Yordan Alvarez', draftPosition: 2.7 },
      { id: 695578, name: 'James Wood', draftPosition: 3.3 },
      { id: 665862, name: 'Jazz Chisholm Jr.', draftPosition: 4.7 },
      { id: 700250, name: 'Ben Rice', draftPosition: 5.3 },
    ],
  },
  {
    teamName: 'Brett K.',
    players: [
      { id: 553993, name: 'Eugenio Suárez', draftPosition: 1.4 },
      { id: 646240, name: 'Rafael Devers', draftPosition: 2.6 },
      { id: 683737, name: 'Michael Busch', draftPosition: 3.4 },
      { id: 608070, name: 'José Ramírez', draftPosition: 4.6 },
      { id: 681481, name: 'Kerry Carpenter', draftPosition: 5.4 },
    ],
  },
  {
    teamName: 'Mike B.',
    players: [
      { id: 665742, name: 'Juan Soto', draftPosition: 1.5 },
      { id: 677594, name: 'Julio Rodríguez', draftPosition: 2.5 },
      { id: 677951, name: 'Bobby Witt Jr.', draftPosition: 3.5 },
      { id: 683002, name: 'Gunnar Henderson', draftPosition: 4.5 },
      { id: 691016, name: 'Tyler Soderstrom', draftPosition: 5.5 },
    ],
  },
  {
    teamName: 'Joe C.',
    players: [
      { id: 663728, name: 'Cal Raleigh', draftPosition: 1.6 },
      { id: 667670, name: 'Brent Rooker', draftPosition: 2.4 },
      { id: 665489, name: 'Vladimir Guerrero Jr.', draftPosition: 3.6 },
      { id: 808959, name: 'Munetaka Murakami', draftPosition: 4.4 },
      { id: 694212, name: 'Samuel Basallo', draftPosition: 5.6 },
    ],
  },
  {
    teamName: 'Fred K.',
    players: [
      { id: 701762, name: 'Nick Kurtz', draftPosition: 1.7 },
      { id: 691406, name: 'Junior Caminero', draftPosition: 2.3 },
      { id: 665487, name: 'Fernando Tatis Jr.', draftPosition: 3.7 },
      { id: 663656, name: 'Kyle Tucker', draftPosition: 4.3 },
      { id: 694671, name: 'Wyatt Langford', draftPosition: 5.7 },
    ],
  },
  {
    teamName: 'Nick M.',
    players: [
      { id: 621566, name: 'Matt Olson', draftPosition: 1.8 },
      { id: 624413, name: 'Pete Alonso', draftPosition: 2.2 },
      { id: 663586, name: 'Austin Riley', draftPosition: 3.8 },
      { id: 679529, name: 'Spencer Torkelson', draftPosition: 4.2 },
      { id: 545361, name: 'Mike Trout', draftPosition: 5.8 },
    ],
  },
  {
    teamName: 'Dillon C.',
    players: [
      { id: 682985, name: 'Riley Greene', draftPosition: 1.9 },
      { id: 666176, name: 'Jo Adell', draftPosition: 2.1 },
      { id: 686469, name: 'Vinnie Pasquantino', draftPosition: 3.9 },
      { id: 662139, name: 'Daulton Varsho', draftPosition: 4.1 },
      { id: 621493, name: 'Taylor Ward', draftPosition: 5.9 },
    ],
  },
]
