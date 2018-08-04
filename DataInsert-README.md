 
The DECLARATIONS of the data insertion functions discussed below live in the following file:
  
 --> server/database/insertDataHelpers.js

 The INVOCATIONS of the data insertion functions discussed below are located within the following file:

 --> index.js
 
 # How to Insert Data into Locally Running mongoDB Instance and Simualte Real-time Data Using Buttons at Top of Webpage

Run "npm start" in the CLI with the below function invocation uncommented in the index.js file:

 populateInProgress(populateClosed); 

--> This function will populate the locally running mongoDB instance with the boxScore table and corresponding dummy      data
--> Use the click-able buttons at the top of the page to simulate real-time changes in the box score widget at            specified "times" (pregame, 7th inning, end of game @ 13th innning)

# Clearing Database, Re-Inserting Data 

If the need to clear the DB and re-insert the data arises, complete the following:

  1) comment out "populateInProgress(populateClosed)"
  2) uncomment and run the below command (just above the "populateInProgress(populateClosed)" invocation in index.js)

      --> deleteFromDB(() => {
            populateInProgress(() => {
              populateClosed();
            })
         });

# For Further Development

In order to leverage nodemon for more efficient development, do the following tasks:

  1) make sure to comment out ALL data insertion invocations in index.js 
      --> due to inherent nodemon process restarts that will result from repeated babel transpilations, commenting        out the data insertion invocations prevents attempts to re-insert duplicate data into the local mongoDB         instance
  2) run "npm run start-dev"

