import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Scoreboard from './components/scoreboard';


class App extends Component {
  state = {
    league: null,
    baseSportLength: null,
    sportTypeCheck: false, // root condition that will only render scoreboard once sport type returned from initial DB query
  }

  renderScoreboard = () => {
    return (
      <div>
        <Scoreboard baseSportLength={this.state.baseSportLength} league={this.state.league}/>
      </div>
    )
  }

  componentWillMount() {
    axios.get('/inProgress')
      .then(({data}) => {
        this.setState({
          league: data.league.alias
        })
      })
      .then(() => {
        if (this.state.league === 'MLB') {
          this.setState({
            baseSportLength : 9
          })
        } else if (this.state.league === 'NBA' || this.state.league === 'NFL') {
          this.setState({
            baseSportLength: 4
          })
        } else {
          this.setState({ // for NHL
            baseSportLength: 3
          })
        }
      })
      .then(() => {
        this.setState({
          sportTypeCheck: true
        })
      })
      .catch((err) => {
        console.error(err);
      })
  }

  render () {
    return (
      <div>
        {this.state.sportTypeCheck
          ? this.renderScoreboard()
          : null
        }
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));