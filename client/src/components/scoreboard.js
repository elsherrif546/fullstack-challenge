import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


class Scoreboard extends Component {
  state = {
    pregame: null, // create ternary to render just pregame in current period area
    gameInProgressData : null,
    gameOverData: null
  }

  componentDidMount () {
    axios.get('/inProgress')
      .then((inProgressData) => {
        console.log('What does this data coming back from API look like : ', inProgressData);
        this.setState({
          gameInProgressData : inProgressData
        })
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    return (
      <div className="boxscore">
        {/*need to insert some straight HTML organized, plus team details returned from the scoreboard? how to approach this*/}
        <div className="boxscore__team boxscore__team--header">
          <label></label>
          <div className="boxscore__team__units">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>6</span>
            <span>7</span>
            <span>8</span>
            <span>9</span>
          </div>
          <div className="boxscore__team__results">
            <span>R</span>
            <span>H</span>
            <span>E</span>
          </div>
        </div>
        <div className="boxscore__team boxscore__team--away">
          <label>CHC</label>
          <div className="boxscore__team__units">
            <span>1</span>
            <span>0</span>
            <span>2</span>
            <span>0</span>
            <span>0</span>
            <span>0</span>
            <span>0</span>
            <span>1</span>
            <span>1</span>
          </div>
          <div className="boxscore__team__results">
            <span>5</span>
            <span>12</span>
            <span>0</span>
          </div>
        </div>
        <div className="boxscore__team boxscore__team--home">
          <label>STL</label>
          <div className="boxscore__team__units">
            <span>0</span>
            <span>0</span>
            <span>0</span>
            <span>3</span>
            <span>0</span>
            <span>0</span>
            <span>0</span>
            <span>0</span>
            <span>1</span>
          </div>
          <div className="boxscore__team__results">
            <span>4</span>
            <span>8</span>
            <span>1</span>
          </div>
        </div>
        <div className="boxscore__details">
          <div className="boxscore__details__team boxscore__details__team--away">
            <p>
              <strong>Cubs</strong><small>CHC</small>
            </p>
            <span>56-38</span>
          </div>
          <div className="boxscore__details__info">
            <strong>Btm<br/>9th</strong>
          </div>
          <div className="boxscore__details__team boxscore__details__team--home">
            <p>
              <strong>Cardinals</strong><small>STL</small>
            </p>
            <span>56-38</span>
          </div>
        </div>
      </div>
    )
  }
 }

export default Scoreboard;