import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AddInventory from './components/AddInventory'
import RandomGenerator from './components/RandomGenerator'


class App extends Component {
  render () {
    return (
      <div>
        <h1 className='title'>GarbGuess</h1>
        <h3 className='tagline'>With this app, your outfit will always impress</h3>
        <AddInventory />
        <div className='randomGenerator'>
          <RandomGenerator />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));