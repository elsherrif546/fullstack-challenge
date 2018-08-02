const mongoose = require('mongoose');
const config = { // prevents warning with deprecated URL parser
  autoIndex: false,
  useNewUrlParser: true,
};
mongoose.connect('mongodb://localhost:27017/boxScore', config);

var db = mongoose.connection;

db.on('error', () => {
  console.log('error connecting to mongo');
});

db.on('open', () => {
  console.log('mongo connected and running');
});

const Schema = mongoose.Schema;

const boxScoreSchema = new Schema({
  status: String,
  awayTeamFinal: Number, // total score at current snapshot in time
  awayTeamDetails: Array,
  homeTeamFinal: Number, // total score at current snapshot in time
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
    id: String // may be unnecessary, just check if alias MLB --> add errors, runs, hits etc. ?
  },
  id: String
});

const BoxScore = mongoose.model('BoxScore', boxScoreSchema);

module.exports = {
  BoxScore,
  db
}