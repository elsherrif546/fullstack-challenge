import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


class App extends Component {
  state = {
    progress: 0
  }

  componentDidMount() {
    // leverage axios to make requisite api calls
  }
  componentWillMount() { // first true life cycle method --> called one time, before initial render - takes NO args
    // therefore --> no access to native UI === DOM, and cannot access children refs (great for integrating w/ 3rd party libraries)
    // great for helping to prepare for 1st render
    // make corresponding state changes based on current  / next props and state
  }
  // progress bar sample
  load = () => { 
    var { progress } = this.state;
    // var that = this;
    // function startLoad () { // make var expression & swap out arrow fns to lexically bind instead of this/that hack
    let startLoad = () => {
      if (progress >= 100) {
        clearInterval(load);
        // that.setState(() => {
        this.setState(() => {
          return {
            progress : 0
          }
        })
      } else {
        this.setState({
          progress: progress += 1
        }, () => {
          console.log('how many times does this run?')
        });
      }
    }
    var load = setInterval(startLoad, 50)
    // setInterval(startLoad, 150); // cant use this --> need to assign interval to a var so it can be clearedo
  }

  render () {
    return (
      <div>
        <p style={{textAlign: 'center'}}>hello world.</p>
        <div>
          <button onClick={this.load} className="load">load</button>
        </div>
        <div className="progress-bar">
          <div style={{width: `${this.state.progress}%`}} className="progress-bar__current-progress">{`${this.state.progress}%`}</div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));