const mongoose = require('mongoose');
const inProgressGameData = require('./../data/innings.7.json');
const closedGameData = require('./../data/innings.13.json');
const BoxScore = require('./BoxScore');

// // could even chain promises together here??
const deleteFromDB = cb => {
  BoxScore.deleteMany({}, err => {
    if(err) {
      console.error(err);
    } else {
      console.log('Deleted everything from DB');
      cb(); // but this is obviously running, since 1st time in proress runs, HOW>?!?
    }
  });
};

const populateInProgress = cb => {
  var newScore = new BoxScore(inProgressGameData.game);
  // console.log('in progress = ', newScore);
  console.log('1st time in progress')
  newScore.save(err => {
  // BoxScore.create(inProgressGameData.game, err => { // NONE of this will save until the connection is opened
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
  console.log('2nd time - closed')
  // console.log('closed game = ', newScore);
  newScore.save(err => {
  // BoxScore.create(closedGameData, err => {
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