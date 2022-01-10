import React from 'react'
import { Button } from 'react-materialize'

export default class AddReadingListButton extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      disabled: false
    }
  }
  addToReadingList = async () => {
    const id = this.props.paperid
  }

  render(){
    let text = "Add to Reading List"
    if(this.state.disabled) text = "Added to Reading List"
    
    return(<Button node="button" disabled={this.state.disabled}>{text}</Button>)
  }
}