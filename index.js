const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const deleteFromDB = require('./server/database/insertDataHelpers').deleteFromDB;
const populateInProgress = require('./server/database/insertDataHelpers').populateInProgress;
const populateClosed = require('./server/database/insertDataHelpers').populateClosed;

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './client/dist')));

// app.get('pregame', controller fn that gets pregame data) // which is just blank scrren? 
// could also just render empty scoreboard, or even just both teams with a "game time"

// app.get('in progress', controller fn that gets in game data to popualte scoreboard)

// app.get('closed', controller fn that gets final score data to populate scoreboard)


app.listen(port,() => {
  console.log(`Listening on port # ${port}`);
})

// deleteFromDB(populateInProgress(populateClosed)); // do I need to reverse this? or just setup function itself to take a callback

populateInProgress(populateClosed);