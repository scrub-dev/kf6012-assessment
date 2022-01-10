import React from 'react'
import { Button } from 'react-materialize'

export default class AddReadingListButton extends React.Component {

  addToReadingList = async () => {
    const id = this.props.paperid
  }

  render(){
    return(<Button node="button">Add to Reading List</Button>)
  }
}