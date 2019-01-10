import React, { Component } from 'react';
import axios from 'axios';


class RandomGenerator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      randomOutfit: {},
      colorOne: '',
      colorTwo: ''
    }
    // bind methods here for ToC
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.generateRandom = this.generateRandom.bind(this)
  }
  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value 
    })
  }
  handleSubmit (e) {
    e.preventDefault()
    const { colorOne, colorTwo } = this.state
    // this is where, with more time, I would try to sanitize & validate the input as legitimate colors to check
    this.generateRandom()
  }
  generateRandom (colors) { // naming convention = was torn between just naming this generate, or generate random --> went with more explicit
    // this fn will randomly get 1 of each NECESSARY type of clothing (at a minimum) based on color palette provided by user
    // leverage promise chaining
    axios.post('/random', randomOutfit)
    .then((response)=>{
      this.setState({
        randomOutfit: response.data // this would return a random outfit (still need to return api call)
      })
    })
    .catch((err) => {
      console.error(err)
    })
  }

  render () {
    const { colorOne, colorTwo } = this.state
    return (
      <div className='randomForm'>
        Generate Outfit Based on Two Colors:
        <form>
          <label>
            Color One:
            <input type="text" name="name" className='input' value={colorOne} onChange={this.handleChange} />
          </label>
          <label>
            Color Two:
            <input type="text" name="name" className='input' value={colorTwo} onChange={this.handleChange} />
          </label>
          <input type="submit" className='randomSubmit' value="Submit" />
        </form>
      </div>
    )
  }

}

export default RandomGenerator