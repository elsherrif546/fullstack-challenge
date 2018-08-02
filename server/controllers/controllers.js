const BoxScore = require('./../database/database').BoxScore;
const db = require('./../database/database').db;

getInProgress = (req, res) => {
  // just hard code "in progress?", dont even need request object
  BoxScore.findOne({status : 'INPROGRESS'}, (err, inProgressData) => {
    if(err) {
      console.error(err);
    } else {
      res.send(inProgressData);
    }
  }) // .exec(); is this necessary?
};

getClosedData = (req, res) => {
  BoxScore.findOne({status: 'CLOSED'}, (err, closedData) => {
    if(err) {
      console.error(err);
    } else {
      res.send(closedData);
    }
  }); // .exec(); is this necessary?
};

module.exports = {
  getInProgress,
  getClosedData
}