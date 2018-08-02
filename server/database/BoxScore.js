var mongoose = require('mongoose');
// const db = require('./database.js');

const boxScoreSchema = new mongoose.Schema({
  // how to design the data? // 
});

const BoxScore = mongoose.model('BoxScore', boxScoreSchema);

module.exports = BoxScore;