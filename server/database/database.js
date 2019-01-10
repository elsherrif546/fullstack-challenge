const mongoose = require('mongoose');

// Mongoose Connection - LOCAL
const config = { // this config object prevents warning with deprecated URL parser
  autoIndex: false,
  useNewUrlParser: true,
};
mongoose.connect('mongodb://localhost:27017/garbGuess', config);
var db = mongoose.connection;

db.on('error', () => {
  console.log('error connecting to mongo');
});

db.on('open', () => {
  console.log('mongo connected and running');
});


// Schema Design --> may not be necessary with newest version
const Schema = mongoose.Schema;

const clothingSchema = new Schema({
  name: String,
  type: String,
  bodyPart: String,
  color: String,
  lightnessLevel: String,
  imageUrl: String
});

const Clothing = mongoose.model('Outfit', clothingSchema);

module.exports = {
  Clothing,
  db
}