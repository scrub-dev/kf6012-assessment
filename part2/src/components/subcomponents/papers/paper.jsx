import React from 'react'
import {Modal, Button, Col } from 'react-materialize'
import AddReadingListButton from '../readinglist/addreadinglistbutton'
import RemoveReadingListButton from '../readinglist/removereadinglistbutton'
/**
 * @author: Scott Donaldson 19019810
 */
export default class Paper extends React.Component {
  
  // get all authors of a specific paper and generate a string
  getAuthors = () => {
    let output = []
    this.props.paper.authors.forEach( e => {
      output.push(e.author_name)
    })
    return output.join(", ")
  }

  // change size of grid depending on how many papers are displayed
  generateDynamicSize = () => {
    if(this.props.size === 1 || this.props.size === 0) return {s: 12, m: 12, l: 12}
    else if (this.props.size <= 9) return {s: 12, m: 12, l: 12}
    else if (this.props.size <= 18) return {s: 6, m: 6, l: 6}
    else return {s: 12, m: 4, l: 4}
  }

  videoButton = () => {
    let redirect = () => {
      window.open(this.props.paper.video)
    }
    return (
      <Button className='left btn-flat' onClick={redirect}>Video</Button>
    )
  }
  doiButton = () => {
    let redirect = () => {
      window.open(this.props.paper.doi)
    }
    return (
      <Button className='left btn-flat' onClick={redirect}>DOI</Button>
    )
  }

  render () {
    let gds = this.generateDynamicSize()
    // set the buttons to either add or remove from reading list if user is authenticated
    let rlbutton = ""
    if(this.props.rltype !== undefined && this.props.rltype === 'remove' && this.props.authenticated){
      rlbutton = (<RemoveReadingListButton paperid={this.props.paper.paper_id} rlaction={this.props.rlaction}/>)
    }
    if(this.props.rltype !== undefined && this.props.rltype === 'add' && this.props.authenticated){
      rlbutton = (<AddReadingListButton paperid={this.props.paper.paper_id}/>)
    }

    return (
      <Col s={gds.s} m={gds.m} l={gds.l}>
        <Modal
          actions={[
            rlbutton, <Button flat modal="close" node="button">Close</Button>, this.videoButton(), this.doiButton()
          ]}
          bottomSheet={false}
          fixedFooter={false}
          id={this.props.paper.paper_id}
          open={false}
          trigger={<Button node="button" className='full resize top-padding'>{this.props.paper.title}</Button>}
        >
          <span><strong>Title: </strong>{this.props.paper.title}</span>
          <p><strong>Abstract: </strong>{this.props.paper.abstract}</p>
          <p><strong>Authors: </strong>{this.getAuthors()}</p>
        </Modal>
      </Col>
    )
  }
}
