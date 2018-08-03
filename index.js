const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const deleteFromDB = require('./server/database/insertDataHelpers').deleteFromDB;
const populateInProgress = require('./server/database/insertDataHelpers').populateInProgress;
const populateClosed = require('./server/database/insertDataHelpers').populateClosed;

const controllers = require('./server/controllers/controllers');

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './client/dist')));

// no request for pregame --> just create a button to render "pre game" with just team names and game time

app.get('/inProgress', controllers.getInProgress); // controller fn that gets in game data to popualte scoreboard)

app.get('/closed', controllers.getClosedData); // controller fn that gets final score data to populate scoreboard)

// --> cause the "final" to render under "current" period?

// if have time --> create "post game" to just run with final score && 


app.listen(port, () => {
  console.log(`Listening on port # ${port}`);
})


// deleteFromDB(() => { // clean out DB, repopulate
//   populateInProgress(() => {
//     populateClosed();
//   })
// });

// populateInProgress(populateClosed); // run this command to populate mongoDB instance running locally