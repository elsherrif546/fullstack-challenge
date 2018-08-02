import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Scoreboard from './components/scoreboard';
import PreGame from './components/pregame';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // team: 'nyj'
    }
  }

  render() {
    return (
      <div>
         <PreGame />
      </div>
    
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));