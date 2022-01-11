import React from 'react'
import { Button } from 'react-materialize'
import config from '../../../config'
/**
 * @author: Scott Donaldson 19019810
 */
export default class RemoveReadingListButton extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      disabled: false
    }
  }
  // remove paper id from users reading list
  removeFromReadingList = async () => {
    const id = this.props.paperid

    try{
      let url = ((config.DEV_MODE)? config.DEV_BASEPATH : config.BASEPATH) + 'readinglist'

      let formData = new FormData();
      formData.append('token', localStorage.getItem('authToken'))
      formData.append('remove', id)

      let res = await fetch(url, {
        method: "POST",
        headers: new Headers(),
        body: formData
      })
      let data = await res.json()
      if(data.status === 200 || data.status === 204){
        this.setState({disabled: true})
        this.props.rlaction(this.props.paperid)
      }
    }catch(e){
      console.log("Something went wrong", e)
    }

  }

  render(){
    return(<Button node="button" disabled={this.state.disabled} onClick={this.removeFromReadingList} modal='close'>Remove to Reading List</Button>)
  }
}