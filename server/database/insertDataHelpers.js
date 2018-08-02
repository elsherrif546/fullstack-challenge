const mongoose = require('mongoose');
const inProgressGameData = require('./../data/innings.7.json');
const closedGameData = require('./../data/innings.13.json');
const BoxScore = require('./database').BoxScore;
const db = require('./database').db;

const deleteFromDB = cb => {
  db.dropDatabase();
  console.log('deleted database');
  cb();
};

const populateInProgress = cb => {
  var newScore = new BoxScore(inProgressGameData.game);
  newScore.save(err => {
    if(err) {
      console.error(err);
    } else {
      console.log('populated db with in progress data');
      cb();
    }
  });
};

const populateClosed = () => {
  var newScore = new BoxScore(closedGameData);
  newScore.save(err => {
    if(err) {
      console.error(err);
    } else {
      console.log('populated db with closed game data');
    }
  });
};

module.exports = {
  deleteFromDB,
  populateInProgress,
  populateClosed
}