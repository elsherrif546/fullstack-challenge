const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:3000/boxScore');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('connected and running!')
});


module.exports = db;

