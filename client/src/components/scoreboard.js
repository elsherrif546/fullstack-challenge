import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


class Scoreboard extends Component {
  state = {
    pregame: true,
    gameInProgressData : null,
    gameOverData: null
  }

  showSeventhInning = () => {
    this.setState({
      pregame: !this.state.pregame // trigger some ternary 
    });
  };

  getGameOver = () => {
    axios.get('/closed')
      .then(({data}) => {
        this.setState({
          gameOverData: data
        })
      })
      .catch((err) => {
        console.error(err);
      })
  };

  componentDidMount () {
    axios.get('/inProgress')
      .then(({data}) => {
        this.setState({
          gameInProgressData : data
        }, () => {
          console.log('gameInProgressData', this.state.gameInProgressData);
        })
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    return (
      <div>
        <div className="update-btn-container">
          <div>
            <button className="update-btn" onClick={this.showSeventhInning}>simulate 7th inning update</button>
          </div>
          <div>
            <button className="update-btn" onClick={this.getGameOver}>simulate game over update</button>
          </div>
        </div>
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
      </div>
    )
  }
 }

export default Scoreboard;