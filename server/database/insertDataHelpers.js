const mongoose = require('mongoose');
const sample = require('./../data/sample.json');
const { Clothing } = require('./database');
const { db } = require('./database');

const deleteFromDB = cb => {
  db.dropDatabase();
  console.log('deleted database');
  cb();
};

const insertSample = () => {
  var sampleClothing = new Clothing(sample[0]) // be mindful of data structure --> may need to drill into properties of a json data set
  console.log('sampleClothing = ', sampleClothing)
  sampleClothing.save((err) => {
    if (err) {
      console.error(err)
    } else {
      console.log('populated with sample data')
    }
  })
}

module.exports = {
  deleteFromDB,
  insertSample
}