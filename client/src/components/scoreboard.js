import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


class Scoreboard extends Component {
  state = {
    score: 117
  }

  componentDidMount () {
    axios.get('inProgress')
      .then((inProgressData) => {
        this.setState({
          inProgress : inProgressData
        })
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
   // create PREGAME function that only displays home and away with game time
   // have this render first when there is no data, 

    return (
      <div>
        {this.props.currentTeam}'s score = {this.state.score}
      </div>
    )
  }
 }

export default Scoreboard;