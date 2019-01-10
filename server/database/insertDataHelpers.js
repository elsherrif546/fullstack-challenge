const mongoose = require('mongoose');
const sample = require('./../data/sample.json'); // MAKE SURE PROPERLY SOURCING data for insertion
const { Sample } = require('./database');
const { db } = require('./database');

const deleteFromDB = cb => {
  db.dropDatabase();
  console.log('deleted database');
  cb();
};

const insertSample = () => { // may need to take callback if other data files need to be inserted, or could do all at once
  var sample2 = new Sample(sample.test) // be mindful of data strcuture --> may need to drill into properties of a json data set
  sample2.save((err) => {
    if (err) {
      console.error(err)
    } else {
      console.log('populated with sample data')
      // cb()
    }
  })
}

module.exports = {
  deleteFromDB,
  insertSample
}