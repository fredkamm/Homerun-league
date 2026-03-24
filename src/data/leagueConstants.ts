/** Shown on the leaderboard; roster is filled from MLB HR leaders (not in mockLeague). */
export const UNDRAFTED_TEAM_NAME = 'Undrafted'

/** Explains why this row changes during the season */
export const UNDRAFTED_TEAM_SUBTITLE =
  'Top 5 HR leaders not on any roster — updates as the season progresses.'

/** How many hitters to pull from the HR leaderboard after excluding drafted players */
export const UNDRAFTED_ROSTER_SIZE = 5

/** Fetch enough leaderboard rows to find 5 undrafted (9 teams × 5 players = 45 drafted) */
export const HR_LEADERS_FETCH_LIMIT = 250
