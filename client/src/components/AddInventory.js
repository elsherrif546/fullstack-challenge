import React, { Component } from 'react';
import axios from 'axios';


class AddInventory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '', // set to string --> react dev tools will complain about "null" initial value
      type: '',
      bodyPart: '',
      color: '',
      lightnessLevel: '',
      imageUrl: '' 
    }
    // use bindings as a Table of Contents
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.addToInventory = this.addToInventory.bind(this)
  }
  
  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value 
    })
  }
  handleSubmit (e) {
    e.preventDefault()
    const { name, type, bodyPart, color, lightnessLevel, imageUrl } = this.state
    let newOutfit = {}
    // here is where with more time I would do some data validation / sanitization on the newOutfit object -> for now, will just convert to empty string if undefined
    newOutfit.name = name || ''
    newOutfit.type = type || ''
    newOutfit.bodyPart = bodyPart || ''
    newOutfit.color = color || ''
    newOutfit.lightnessLevel = lightnessLevel || ''
    newOutfit.imageUrl = imageUrl || ''

    this.addToInventory(newOutfit)
  }
  addToInventory (newItem) {
    axios.post('/add', newItem)
    .then((response)=>{
      console.log('successfully added!') // nothing really to do, could render a success message adjacent to submit (if time)
    })
    .catch((err) => {
      console.error(err)
    })
  }

  render () {
    const { name, type, bodyPart, color, lightnessLevel, imageUrl } = this.state
    return (
      <div>
        <h5 className='instruction'><u>Add inventory</u></h5>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" className='input' value={name} onChange={this.handleChange} />
          </label>
          <label>
            Type:
            <input type="text" name="type" className='input' value={type} onChange={this.handleChange} />
          </label>
          <label>
            Body Part:
            <input type="text" name="bodyPart" className='input' value={bodyPart} onChange={this.handleChange} />
          </label>
          <label>
            Color:
            <input type="text" name="color" className='input' value={color} onChange={this.handleChange} />
          </label>
          <label>
            Lightness Level:
            <input type="text" name="lightnessLevel" className='input' value={lightnessLevel} onChange={this.handleChange} />
          </label>
          <label>
            Image URL (optional):
            <input type="text" name="imageUrl" className='input' value={imageUrl} onChange={this.handleChange} />
          </label>
          <input type="submit" className='submit' value="Submit" />
        </form>
      </div>
    )
  }
}

export default AddInventory