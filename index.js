const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './client/dist')));

// app.get('pregame', controller fn that gets pregame data)

// app.get('in progress', controller fn that gets in game data)

// app.get('closed', controller fn that gets final score datax)


app.listen(port,() => {
  console.log(`Listening on port # ${port}`);
})