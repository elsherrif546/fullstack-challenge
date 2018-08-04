import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Scoreboard from './components/scoreboard';


const App = () => {
  return (
    <div>
      <Scoreboard />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));