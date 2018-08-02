 
The DECLARATIONS of the data insertion functions discussed below live in the following file:
  
 --> server/database/insertDataHelpers.js

 The INVOCATIONS of the data insertion functions discussed below are located within the following file:

 --> index.js
 
 # How to Insert Data into Locally running mongoDB instance

Run "npm start" in the CLI with the below function invocation uncommented in the index.js file:

 populateInProgress(populateClosed); 

--> This function will populate the locally running mongoDB instance with the boxScore table and corresponding dummy data

# Clearing Database, re-inserting data 

If the need to clear the DB and re-insert the data arises, do the following tasks:

  1) comment out "populateInProgress(populateClosed)"
  2) uncomment and run the below comamand (ust above the "populateInProgress(populateClosed)" invocation in index.js)

# For further development

In order to leverage nodemon for more efficient development, do the following tasks:

  1) make sure to comment out ALL data insertion invocations in index.js 
      --> due to inherent nodemon process restarts that will result from repeated babel transpilations, commenting out the data         insetion invocations prevents attempts to re-insert duplicate data into the local mongoDB instance
  2) run "npm run start-dev"

