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


app.get('/inProgress', controllers.getInProgress); // controller/model that gets in-progress game data to populate scoreboard)

app.get('/closed', controllers.getClosedData); // controller/model that gets final score data to populate scoreboard)


app.listen(port, () => {
  console.log(`Listening on port # ${port}`);
})

// deleteFromDB(() => { // uncomment this series of async methods to clean out DB and then repopulate it
//   populateInProgress(() => {
//     populateClosed();
//   })
// });

// populateInProgress(populateClosed); // uncomment this method to populate mongoDB instance running locally