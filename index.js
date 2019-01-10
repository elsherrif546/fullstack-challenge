const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const { deleteFromDB } = require('./server/database/insertDataHelpers')
const { insertSample } = require('./server/database/insertDataHelpers')

const controllers = require('./server/controllers/controllers'); // all controller methods live here
const { addClothing } = controllers

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './client/dist')));

// ROUTES

app.post('/add', addClothing)


app.listen(port, () => {
  console.log(`Listening on port # ${port}`);
})

// Data Insertion Scripts = add data insertion helpers here

// insertSample() // uncomment this method to populate mongoDB instance running locally

// deleteFromDB(() => { // uncomment this series of async methods to clean out DB and then repopulate it
//   insertSample()
// });