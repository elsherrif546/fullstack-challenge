# Instructions for how to Launch the Node.js API 


# Locations for all Data Insertion Method Declarations & Invocations

The DECLARATIONS of the data insertion functions discussed below live in the following file:
  
      --> server/database/insertDataHelpers.js

 The INVOCATIONS of the data insertion functions discussed below are located within the following file:

      --> index.js
 
 # How to Launch Application and Insert Data into mongoDB instance running locally

Run "npm start" in the CLI with the below function invocation un-commented in the index.js file:

      --> populateInProgress(populateClosed); 

   - This function will populate the locally running mongoDB instance with the boxScore table and corresponding dummy data
   - Go to localhost:3000 in your browser to access the app
   - Use the click-able buttons at the top of the page to simulate real-time changes in the box score widget at specified "times" (pregame, 7th inning, end of game @ 13th innning)

# Clearing Database, Re-Inserting Data 

If the need to clear the DB and re-insert the data arises, complete the following:

  1) comment out "populateInProgress(populateClosed)"
  2) uncomment and run the below command (just above the "populateInProgress(populateClosed)" invocation in index.js):

      --> deleteFromDB(() => {
            populateInProgress(() => {
              populateClosed();
            })
         });
