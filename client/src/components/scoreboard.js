import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


class Scoreboard extends Component {
  state = {
    pregame: true,
    gameData: null, // rolling update of current game data
    status: null, // use to check if in progress
    league: null, // include for potentially checking other game feeds (for MLB --> render hits / errors )
    homeTeamAbbr: null,
    homeTeamName: null,
    awayTeamAbbr: null,
    awayTeamName: null,
    homeTeamFinal: 0,
    awayTeamFinal: 0,
    homeHitTotal: 0, // only MLB
    awayHitTotal: 0, // only MLB
    homeErrorTotal: 0, // only MLB
    awayErrorTotal: 0, // only MLB
    currentLength: null, // this needs to be set to whatever sport minimum length (9 innings for MLB, 4 qtrs for NHL, etc.) --> then auto expand for extra time
    bottomOfInning: false,
    currentPeriod: null, // need to render pregame component if game not started
  }

  resetPregame = () => {
    this.setState({
      pregame: true, // need to use conditional rendering to only render "pregame" component
      topOfInning: null, // if any other sport, this state can be removed
      currentPeriod: null,
      homeTeamFinal: 0,
      awayTeamFinal: 0
    });
  };

  getSeventhInning = () => {
    axios.get('/inProgress')
      .then(({data}) => {
        this.setState({
          pregame: false, // trigger ternary
          gameData: data,
          status: data.status,
          bottomOfInning: data.currentPeriodHalf === "B" ? 'BTM' : 'TOP',
          currentPeriod: data.currentPeriod,
          homeTeamFinal: data.homeTeamFinal,
          awayTeamFinal: data.awayTeamFinal
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
          status: data.status,
          bottomOfInning: data.currentPeriodHalf === "B" ? 'BTM' : 'TOP',
          currentPeriod: data.currentPeriod,
          homeTeamFinal: data.homeTeamFinal,
          awayTeamFinal: data.awayTeamFinal
        });
      })
      .catch((err) => {
        console.error(err);
      })
  }

  getExtension = (currentPeriod) => {
    if (currentPeriod === 1) {
      return 'ST';
    } else if (currentPeriod === 2) {
      return 'ND';
    } else if (currentPeriod === 3) {
      return 'RD';
    } else {
      return 'TH';
    }
  }

  componentDidMount () {
    axios.get('/inProgress')
      .then(({data}) => {
        this.setState({
          gameData : data,
          league: data.league.alias,
          homeTeamAbbr: data.homeTeam.abbr,
          homeTeamName: data.homeTeam.name,
          awayTeamAbbr: data.awayTeam.abbr,
          awayTeamName: data.awayTeam.name
        });
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
            <button className="update-btn" onClick={this.resetPregame}>simulate pregame reset</button>
          </div>
          <div>
            <button className="update-btn" onClick={this.getSeventhInning}>simulate 7th inning update</button>
          </div>
          <div>
            <button className="update-btn" onClick={this.getGameOver}>simulate game over update</button>
          </div>
        </div>
        <div className="boxscore">
          {/* { this.state.league === 'MLB' 
            ? this.setState({
                currentLength : 9
            })
            : null
          } */}
          <div className="boxscore__team boxscore__team--header">
            <label></label>
            {/* need to account for a baseball game being 9 innings, and then possibly going over if necessary */}
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
              {/* need to create check for if MLB --> loop thru and create 9 spans : could set state to be whatever total is */}
              {/* remember --> its react so leverage state =  */}
              {/* if MLB --> set state ot be 9, and if extra innings, add that to state */}
              {/* if currentPeriod > 9, then create mapping func that loops thru the remaining periods and adds an inning span */}
            </div>
            {/* if MLB --> render hits and errors accordingly */}
            { this.state.league === 'MLB'
              ?
              <div className="boxscore__team__results">
                <span>R</span>
                <span>H</span>
                <span>E</span>
              </div>
              : 
              <div className="boxscore__team__results">
                <span>* Pts/Goals *</span> {/* whatever score system */}
              </div>
            }
          </div>
          <div className="boxscore__team boxscore__team--home">
            <label>{this.state.homeTeamAbbr}</label>
            <div className="boxscore__team__units">
              {/* populate with whatever current runs are --> the rest need to be just 0 */}
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
            { this.state.league === 'MLB'
              ?
              <div className="boxscore__team__results">
                <span>{this.state.homeTeamFinal}</span>
                <span>{this.state.homeHitTotal}</span>
                <span>{this.state.homeErrorTotal}</span>
              </div>
              : 
              <div className="boxscore__team__results">
                <span>*Point Type*</span>
              </div>
            }
          </div>
          <div className="boxscore__team boxscore__team--away">
            <label>{this.state.awayTeamAbbr}</label>
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
              { this.state.league === 'MLB'
                ?
                <div className="boxscore__team__results">
                  <span>{this.state.awayTeamFinal}</span>
                  <span>{this.state.awayHitTotal}</span>
                  <span>{this.state.awayErrorTotal}</span>
                </div>
                : 
                <div className="boxscore__team__results">
                  <span>*Point Type*</span>
                </div>
              }
          </div>
          <div className="boxscore__details">
            <div className="boxscore__details__team boxscore__details__team--home">
              <p>
                <strong>{this.state.homeTeamName}</strong><small>{this.state.homeTeamAbbr}</small>
              </p>
              <span>56-38</span> {/* no record included in dummy data, leave for cleaner UI */}
            </div>
            <div className="boxscore__details__info">
            {/* for non-MLB games --> just need to remove "BTM"/"TOP" section of ternary and include currentPeriod + hard-coded Prd, Qtr, etc. for NHL, NBA, NHL games */}
            {/* leverage conditional rendering w/ ternaries to check game progress --> pregame / postgame / in-progress */}
               { this.state.pregame
                ? <strong>TODAY<br/>7:10pm EST</strong>
                : this.state.status === 'CLOSED'
                ? <strong>FINAL</strong>
                : this.state.bottomOfInning
                ? <strong>BTM<br/>{this.state.currentPeriod}{this.getExtension(this.state.currentPeriod)}</strong> 
                : <strong>TOP<br/>{this.state.currentPeriod}{this.getExtension(this.state.currentPeriod)}</strong> 
               }
            </div>
            <div className="boxscore__details__team boxscore__details__team--away">
              <p>
                <strong>{this.state.awayTeamName}</strong><small>{this.state.awayTeamAbbr}</small>
              </p>
              <span>56-38</span> {/* no record included in dummy data, leave for cleaner UI */}
            </div>
          </div>
        </div>
      </div>
     )
   }
 }

export default Scoreboard;