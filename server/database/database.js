const mongoose = require('mongoose');

// Mongoose Connection - LOCAL
const config = { // this config object prevents warning with deprecated URL parser
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


// Schema Design
const Schema = mongoose.Schema;

const boxScoreSchema = new Schema({
  status: String,
  awayTeamFinal: Number, // total score at current time
  awayTeamDetails: Array,
  homeTeamFinal: Number, // total score at current time
  homeTeamDetails: Array,
  currentPeriodHalf: String,
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
    id: String
  },
  id: String
});

const BoxScore = mongoose.model('BoxScore', boxScoreSchema);

module.exports = {
  BoxScore,
  db
}