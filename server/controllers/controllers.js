const { Clothing } = require('./../database/database');
const { db } = require('./../database/database');

addClothing = (req, res) => { 
  // STRIP WHATEVER DATA YOU NEED OFF THE .body, .params, .query properties of the request object --> so much functionality here, just put in body?
  Clothing.create(req.body, (err, newClothing) => {
    if(err) {
      console.error(err);
    } else {
      res.status(201).send(newClothing); // may have to check what gets returned, nothing really to send aside from succesful message
    }
  });
};

getRandom = (req, res) => {
  // strip off 2 colors from the req object
  // would need to then get minimum of shirt/pants/shoes combo (if not more)
}

module.exports = {
  addClothing,
  getRandom
}