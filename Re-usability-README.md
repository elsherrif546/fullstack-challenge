# Re-usable Components for Different Sports Teams
  --> how each component would be able to be adapted with different sports-type game feeds (NHL, NBA, NFL)

# Different Time Periods

  for non MLB games, simply remove the ternary operator checking the "currentPeriodHalf" property that returns a "Top" && "Bottom" from the DB and use a JS expression to insert the current period # along with the proper period type (Quarter, Period, etc.) hard-coded in

# MLB --> Hits && Errors

  if data getting returned has "MLB" tag --> render the additional aggregated hits and errors adjacent to the total runs scored (up to that point in the game)

# How to Render Minimum Amount of Game Periods WHILE the game is in-Progress

  {/* need to create check for if MLB --> loop thru and create 9 spans : could set state to be whatever total is */}
  {/* remember --> its react so leverage state =  */}
  {/* if MLB --> set state ot be 9, and if extra innings, add that to state */}
  {/* if currentPeriod > 9, then create mapping func that loops thru the remaining periods and adds an inning span */}

  Upon initial db query during initial page load, use the "league" type to render the corresponding game length of whatever sport is selected (ex: MLB --> 9 innings);

# How to account for Extra Seuqences (Extra Innings, Overtime)

  Need to check if the current length of home / away details (shouldnt matter which is chosen) is longer than minimum game time, if YES --> use the setState method to  --> this reset of state will cause a page re-render that loops thru the amount of sequences in home / away details to add the corresponding # of extra sequences

  REAL-TIME CAVEAT --> obviously, real-time data would have a socket constantly causing page re-render

# Game Life Cycle --> Pre-game / In Game / Post-game

  Leverage conditional rendering to render less robust pregame && postgame 
