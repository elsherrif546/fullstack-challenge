const BoxScore = require('./../database/database').BoxScore;
const db = require('./../database/database').db;


// controllers that simulate fetching "real-time" data
getInProgress = (req, res) => {
  // just hard code "INPROGRESS" --> no need to attach params to request obj
  BoxScore.findOne({status : 'INPROGRESS'}, (err, inProgressData) => {
    if(err) {
      console.error(err);
    } else {
      res.send(inProgressData);
    }
  });
};

getClosedData = (req, res) => {
  // just hard code "CLOSED" --> no need to attach params to request obj
  BoxScore.findOne({status: 'CLOSED'}, (err, closedData) => {
    if(err) {
      console.error(err);
    } else {
      res.send(closedData);
    }
  });
};

module.exports = {
  getInProgress,
  getClosedData
}