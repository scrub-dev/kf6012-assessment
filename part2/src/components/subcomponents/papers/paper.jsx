import React from 'react'
import {Modal, Button, Col } from 'react-materialize'
import AddReadingListButton from '../readinglist/addreadinglistbutton'
import RemoveReadingListButton from '../readinglist/removereadinglistbutton'

export default class Paper extends React.Component {
  getAuthors = () => {
    let output = []
    this.props.paper.authors.forEach( e => {
      output.push(e.author_name)
    })
    return output.join(", ")
  }

  generateDynamicSize = () => {
    if(this.props.size === 1 || this.props.size === 0) return {s: 12, m: 12, l: 12}
    else if (this.props.size <= 9) return {s: 12, m: 12, l: 12}
    else if (this.props.size <= 18) return {s: 6, m: 6, l: 6}
    else return {s: 12, m: 4, l: 4}
  }
  render () {
    let gds = this.generateDynamicSize()
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
            rlbutton, <Button flat modal="close" node="button">Close</Button>
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
