const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/boxScore');

var db = mongoose.connection;

db.on('error', () => {
  console.log('error connecting to mongo'); // i dont even see this, WWHY?!
});

db.on('open', () => {
  console.log('mongo connected and running');
});

const Schema = mongoose.Schema;

const boxScoreSchema = new Schema({
  id: { // this will represent each time of the game? or does this auto get created
    type: Number,
    unique: true
  },
  status: String,
  awayTeamFinal: Number, // total score at this time
  awayTeamDetails: Array,
  homeTeamFinal: Number, // total score at this time
  homeTeamDetails: Array,
  currentPeriod: Number,
  homeTeam: {
    teamColor: String,
    textColor: String,
    abbr: String,
    market: String,
    name: String,
    id: String
  },
  awayTeam: {
    teamColor: String,
    textColor: String,
    abbr: String,
    market: String,
    name: String,
    id: String
  },
  league: {
    alias: String,
    id: String // may be unnecessary, just check if alias MLB --> add errors, runs, hits etc.
  },
  id: String
});

const BoxScore = mongoose.model('BoxScore', boxScoreSchema);

module.exports = BoxScore;