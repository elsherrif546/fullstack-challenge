const mongoose = require('mongoose');

// Mongoose Connection - LOCAL
const config = { // this config object prevents warning with deprecated URL parser
  autoIndex: false,
  useNewUrlParser: true,
};
mongoose.connect('mongodb://localhost:27017/sampleDB', config); // swap in database name after local machine
var db = mongoose.connection;

db.on('error', () => {
  console.log('error connecting to mongo');
});

db.on('open', () => {
  console.log('mongo connected and running');
});


// Schema Design --> may not be necessary with newest version
const Schema = mongoose.Schema;

const sampleSchema = new Schema({
  status: String,
  testNumber: Number
});

const Sample = mongoose.model('Sample', sampleSchema); // change model name to whatever is needed

module.exports = {
  Sample, // change model name
  db
}