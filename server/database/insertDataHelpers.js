const mongoose = require('mongoose');
const inProgressGameData = require('./../data/innings.7.json');
const closedGameData = require('./../data/innings.13.json');
const BoxScore = require('./BoxScore');
var db = require('./db/index.js');

// // could even chain promises together here
// const deleteFromDB = (cb) => {
//   // actually delete from db with mongoose helper
//   console.log('Deleted');
//   cb();
// }

// const populateInProgress = (cb) => {
//   //actually populate db with in progress game data
//   return gameData.map((game) => {
//     var newGame = new Box
//   })
//   console.log('populated db with in progress data');
// }

// const populateClosed = (cb) => {
//   //actually populate db with closed game data
//   return gameData.map((game) => {
//     var newGame = new BoxScore()
//   })
//   console.log('populated db with closed data');
// }


// module.exports = {
//   deleteFromDB : deleteFromDB,
//   populateInProgress : populateInProgress,
//   populateClosed : populateClosed
// }