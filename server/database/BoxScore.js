var mongoose = require('mongoose');

const boxScoreSchema = new mongoose.Schema({
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
  id: {
    type: String, // can use the "game" id (bottom of json file) --> this denotes a particular game, not Unique to time
    unique: true
  }
});

const BoxScore = mongoose.model('BoxScore', boxScoreSchema);

module.exports = BoxScore;