# Re-usable Components for Different Sports Teams
  --> how each component could be adapted with different sports-type game feeds (NHL, NBA, NFL)

# Different Time Periods

  - For non MLB games, simply remove the ternary operator checking the "currentPeriodHalf" property that returns a      "Top" && "Bottom" from the DB and use a JS expression to insert the current period # along with the proper period   type (Quarter, Period, etc.) hard-coded in

# MLB --> Hits && Errors

   - If data getting returned has "MLB" tag --> render the additional aggregated hits and errors adjacent to the        total runs scored (up to that point in the game)
   - Otherwise, ignore the extra "Hits" and "Errors" columns and only render whatever point system the sport uses

# How to Render Minimum Amount of Game Periods WHILE the game is in-Progress

   - Upon initial app mounting, make a DB query to get the "league" type to render the corresponding game length of whatever sport is selected (ex: MLB --> 9 innings)
   - 
  

# How to account for Extra Seuqences (Extra Innings, Overtime)

  - IF the base minimum length of the specified sport has been reached, loop through the home and away teamDetails to render the score for each corresponding "extra" time periods

  REAL-TIME CAVEAT --> obviously, real-time data would have a socket constantly causing page re-render

# Game Life Cycle --> Pre-game / In Game / Post-game

  - Leverage conditional rendering to do the following for each life cycle:
      - Pregame --> simply render blank scores across the board for either team, also include the upcoming game         time in the current period tracker
      - In-Game --> keep track of runs (and in MLB case, hits and errors) for each corresponding period && totals       while also making sure to have "0" placeholders for periods that have not been reached yet
      - Post-Game --> render "FINAL" in current period tracker, with fully updated scoreboard
