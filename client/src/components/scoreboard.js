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

  // componentDidMount = () => {
  //   axios.get('//', {

  //   })
  //   .then((data) => {

  //   })
  //   .catch(err => {

  //   });
  // }

  render() {
   // create PREGAME function that only displays home and away with game time

    return (
      <div>
        {this.props.currentTeam}'s score = {this.state.score}
      </div>
    )
  }
 }

export default Scoreboard;