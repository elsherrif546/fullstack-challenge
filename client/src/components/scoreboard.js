import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


class Scoreboard extends Component {
  state = {
    pregame: true,
    gameData: null, // rolling update of current game data
    league: null,
    homeTeam: null,
    awayTeam: null,
    bottomOfInning: false,
    currentPeriod: null
  }

  resetPregame = () => {
    this.setState({
      pregame: true, // need to use conditional rendering to only render "pregame" component
      topOfInning: null, // if any other sport, this state can be removed
      currentPeriod: null
    });
  };

  showSeventhInning = () => {
    axios.get('/inProgress')
      .then(({data}) => {
        this.setState({
          pregame: !this.state.pregame, // trigger some ternary 
          bottomOfInning: data.currentPeriodHalf === "B" ? 'BTM' : 'TOP',
          currentPeriod: data.currentPeriod
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  getGameOver = () => {
    axios.get('/closed')
      .then(({data}) => {
        this.setState({
          gameData : data,
          bottomOfInning: data.currentPeriodHalf === "B" ? 'BTM' : 'TOP',
          currentPeriod: data.currentPeriod
        });
      })
      .catch((err) => {
        console.error(err);
      })
  }

  componentDidMount () {
    axios.get('/inProgress')
      .then(({data}) => {
        this.setState({
          gameData : data,
          league: data.league.alias,
          // homeTeam: data
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
//     const show7thInning = this.state.pregame ? 
// (<div>
//           </div>)
//            : ( <div>
//             </div>)
//       }
console.log(this.state.league);
    return (
      <div>
        <div className="update-btn-container">
          <div>
            <button className="update-btn" onClick={this.resetPregame}>simulate pregame reset</button>
          </div>
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
            {/* need to account for a basebal game being 9 innings, and then possibly going over if necessary */}
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
              {/* make sure to redesign schema to draw in current Period AND current Period from data*/}
         {this.state.bottomOfInning ? <strong>BTM<br/>current Period</strong> : <strong>TOP<br/>current Period </strong> }
            {/* create conditional rendering to check if game over --> render FINAL, or even just the post game component? */}
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