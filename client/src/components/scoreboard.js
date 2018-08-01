import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


class Scoreboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 117
    }
  }
  render() {
    return (
      <div>
        {this.props.currentTeam}'s score = {this.state.score}
      </div>
    )
  }
 }

export default Scoreboard;