const mongoose = require('mongoose');
const inProgressGameData = require('./../data/innings.7.json');
const closedGameData = require('./../data/innings.13.json');
const BoxScore = require('./BoxScore');
// var db = require('./db/index.js');

// // could even chain promises together here??
const deleteFromDB = (cb) => {
  // actually delete everything from db with mongoose helper
  BoxScore.deleteMany({}, (err, results) => {
    if(err) {
      console.error(err);
    } else {
      console.log('Deleted everything from DB');
      cb();
    }
  });
}

const populateInProgress = (cb) => {
  // actually populate db with in progress game data
  // console.log('in progress data = ', inProgressGameData.game); // is this getting transpiled into an JS object literal?
  let newGameData = new BoxScore(inProgressGameData.game);
  console.log('newGameData', newGameData)
  BoxScore.create(function (err) { // data is NOT getting SAVED --> why?
    if(err) {
      console.error(err);
    } else {
      console.log('populated db with in progress data');
      cb();
    }
  });
}

const populateClosed = () => {
  //actually populate db with closed game data
  console.log('closed data = ', closedGameData); // is this getting transpiled into an JS object literal?
  // let newGameData = new BoxScore(closedGameData);
  BoxScore.create((err) => {
    if(err) {
      console.error(err);
    } else {
      console.log('populated db with closed game data');
    }
  });
};


module.exports = {
  deleteFromDB : deleteFromDB,
  populateInProgress : populateInProgress,
  populateClosed : populateClosed
}