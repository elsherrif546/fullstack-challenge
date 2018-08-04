import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


class Scoreboard extends Component {
  state = {
    pregame: true,
    gameData: null, // rolling update of current game data
    status: null, // use to check if in progress / closed
    league: this.props.league, // include for potentially checking other sports' feeds (MLB --> render hits / errors / 9 innings, etc.)
    homeTeamAbbr: null,
    homeTeamName: null,
    awayTeamAbbr: null,
    awayTeamName: null,
    homeTeamFinal: 0,
    awayTeamFinal: 0,
    baseSportLength: this.props.baseSportLength, // sets base length depending of sport type
    bottomOfInning: false,
    currentPeriod: null // keep track of current place in the game
  }

  resetPregame = () => {
    this.setState({
      pregame: true,
      topOfInning: null, // if any other sport, this property of state can be removed
      currentPeriod: null,
      homeTeamFinal: 0,
      awayTeamFinal: 0
    });
  };

  getSeventhInning = () => {
    axios.get('/inProgress')
      .then(({data}) => {
        this.setState({
          pregame: false,
          gameData: data,
          status: data.status,
          bottomOfInning: data.currentPeriodHalf,
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
          pregame: false,
          gameData : data,
          status: data.status,
          bottomOfInning: data.currentPeriodHalf,
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
    const gameLength = (baseLength) => {
      let minimumGameLength = [];
      for(var i = 1; i <= baseLength; i++) {
        minimumGameLength.push(i);
      }
      return minimumGameLength.map((period, i) => {
        return <span key={i}>{period}</span>
      })
    }

    const renderTeamScore = (baseLength, currentPeriod, isHome) => {
      let currentScores = [];
      if (this.state.pregame) {
        for(var i = 1; i <= baseLength; i++) {
          currentScores.push(0);
        }
        currentScores = currentScores.map((zero, i) => {
          return <span key={i}>0</span>
        })
      } else if (!this.state.pregame && currentPeriod <= baseLength) {
          if (isHome) {
            currentScores = this.state.gameData.homeTeamDetails.map((period, i) => {
              return <span key={i}>{period.runs}</span>
            });
            for(var i = currentScores.length; i < baseLength; i++) {
              let emptyScore = ( <span key={i}>0</span> )
              currentScores.push(emptyScore); // renders a "0" for any unreached scoring periods
            }
          } else {
            currentScores = this.state.gameData.awayTeamDetails.map((period, i) => {
              return <span key={i}>{period.runs}</span>
            })
            for(var i = currentScores.length; i < baseLength; i++) {
              let emptyScore = ( <span key={i}>0</span> )
              currentScores.push(emptyScore); // renders a "0" for any unreached scoring periods
            }
          }
      } else { // accounts for any "extra" time periods
        if (isHome) {
          currentScores = this.state.gameData.homeTeamDetails.map((period, i) => {
            return <span key={i}>{period.runs}</span>
          })
        } else {
          currentScores = this.state.gameData.awayTeamDetails.map((period, i) => {
            return <span key={i}>{period.runs}</span>
          })
        }
      }
      return currentScores;
    }

    console.log('when does this render ', this.props.baseSportLength)

    return (
      <div>
        <div className="update-btn-container"> {/* buttons with real-time simulation click handlers */}
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
          <div className="boxscore__team boxscore__team--header">
            <label></label>
            <div className="boxscore__team__units">
              {/* here is where a conditional lives to check if current period > minimum game length --> add extra time if necessary */}
              {this.state.currentPeriod < 9
                ? gameLength(this.state.baseSportLength)
                : this.state.gameData.homeTeamDetails.map((period, i) => { // use homeDetails, although both home and away details arrays have same length
                    return <span key={i}>{period.sequence}</span>
                  })
              }
            </div>
            {/* if MLB --> render hits and errors accordingly (could remove for non-baseball)*/}
            { this.state.league === 'MLB'
              ?
              <div className="boxscore__team__results">
                <span>R</span>
                <span>H</span>
                <span>E</span>
              </div>
              : 
              <div className="boxscore__team__results">
                <span>* Pts/Goals *</span> {/* whatever score system other sport uses */}
              </div>
            }
          </div>
          <div className="boxscore__team boxscore__team--home">
            <label>{this.state.homeTeamAbbr}</label>
            <div className="boxscore__team__units">
              {/* populate with whatever current sports' runs/points are for each period --> remaining periods just render 0 */}
              {renderTeamScore(this.state.baseSportLength, this.state.currentPeriod, true)}           
            </div>
            { this.state.league === 'MLB'
              ?
              <div className="boxscore__team__results">
                <span>{this.state.homeTeamFinal}</span>
                <span>
                  { this.state.pregame
                    ? 0
                    : this.state.gameData.homeTeamDetails.reduce((hits, inning) => {
                      hits += inning.hits;
                      return hits;
                      }, 0)
                  }
                </span>
                <span>
                  { this.state.pregame
                    ? 0
                    : this.state.gameData.homeTeamDetails.reduce((errors, inning) => {
                      errors += inning.errors;
                      return errors;
                      }, 0)
                  }
                </span>
              </div>
              : 
              <div className="boxscore__team__results">
                <span>*Point Type*</span> {/* whatever score system other sport uses */}
              </div>
            }
          </div>
          <div className="boxscore__team boxscore__team--away">
            <label>{this.state.awayTeamAbbr}</label>
            <div className="boxscore__team__units">
              {/* populate with whatever current sports' runs/points are for each period --> remaining periods just render 0 */}
              {renderTeamScore(this.state.baseSportLength, this.state.currentPeriod, false)}
            </div>
            { this.state.league === 'MLB'
              ?
              <div className="boxscore__team__results">
                <span>{this.state.awayTeamFinal}</span>
                <span>
                  { this.state.pregame
                    ? 0 // render 0 if in pregame
                    : this.state.gameData.awayTeamDetails.reduce((hits, inning) => {
                      hits += inning.hits;
                      return hits;
                      }, 0)
                  }
                </span>
                <span>
                  { this.state.pregame
                    ? 0 // render 0 if in pregame
                    : this.state.gameData.awayTeamDetails.reduce((errors, inning) => {
                      errors += inning.errors;
                      return errors;
                      }, 0)
                  }
                </span>
              </div>
              : 
              <div className="boxscore__team__results">
                <span>*Point Type*</span> {/* whatever score system other sport uses */}
              </div>
            }
          </div>
          <div className="boxscore__details">
            <div className="boxscore__details__team boxscore__details__team--home">
              <p>
                <strong>{this.state.homeTeamName}</strong><small>{this.state.homeTeamAbbr}</small>
              </p>
              <span>56-38</span> {/* no record included in dummy data, leave hard-coded for cleaner UI */}
            </div>
            <div className="boxscore__details__info">
            {/* for non-MLB games --> just need to remove "BTM"/"TOP" section of ternary and include currentPeriod + hard-coded Prd, Qtr, etc. for NHL, NBA, NHL games */}
            {/* leverage conditional rendering w/ ternaries to check game progress --> pregame / postgame / in-progress */}
               { this.state.pregame
                ? <strong>TODAY<br/>7:10pm EST</strong>
                : this.state.status === 'CLOSED'
                ? <strong>FINAL</strong>
                : this.state.bottomOfInning === "B"
                ? <strong>BTM<br/>{this.state.currentPeriod}{this.getExtension(this.state.currentPeriod)}</strong> 
                : <strong>TOP<br/>{this.state.currentPeriod}{this.getExtension(this.state.currentPeriod)}</strong> 
               }
            </div>
            <div className="boxscore__details__team boxscore__details__team--away">
              <p>
                <strong>{this.state.awayTeamName}</strong><small>{this.state.awayTeamAbbr}</small>
              </p>
              <span>56-38</span> {/* no record included in dummy data, leave hard-coded for cleaner UI */}
            </div>
          </div>
        </div>
      </div>
     )
   }
 }

export default Scoreboard;