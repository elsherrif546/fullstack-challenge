const { Sample } = require('./../database/database'); // change this model to be whatever my model is
const { db } = require('./../database/database'); // don't think the db is even necessary, all this logic is in helper

// controllers always take (req, res) objects as parameters --> instructs model how to deal with data
// always send something back to client-side (res.send, or some other functionality)

someControllerForDBAction = (req, res) => {
  // use mongoDB model that has been imported to query DB, and send returned data back to client app
  // invoke mongoose comands on mongoose model to query DB
  // example below

  // STRIP WHATEVER DATA YOU NEED OFF THE .body, .params, .query properties of the request object
  // remember to check req.params (part of url, denote with /:id - eg. '/users/:id' )
  // or check query strings tacked onto urls --> req.query
  // req.body --> can check body of url because using bodyParser plugin
  
  Sample.findOne(req.body.test, (err, someData) => { // NOTE: error always first arg, successful data is 2nd
    if(err) {
      console.error(err);
    } else {
      res.send(someData);
      // res.send(whateverData)
      // res.status(error code #).send(whatever JSON data I want returned to client)
    }
  });
};

module.exports = {
  // export any controller methods for use in index.js (server) for communicating back with client
}