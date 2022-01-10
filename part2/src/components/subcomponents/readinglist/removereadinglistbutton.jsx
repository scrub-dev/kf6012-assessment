import React from 'react'
import { Button } from 'react-materialize'

export default class RemoveReadingListButton extends React.Component {

  removeFromReadingList = async () => {
    const id = this.props.paperid
  }

  render(){
    return(<Button node="button">Remove to Reading List</Button>)
  }
}