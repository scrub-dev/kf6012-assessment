import React from 'react'
import {Modal, Button } from 'react-materialize'

export default class Paper extends React.Component {
  truncate = (string) => {
    let length = 120
    return string.substring(0, length) + "..."
  }

  getAuthors = () => {
    let output = []
    this.props.paper.authors.forEach( e => {
      output.push(e.author_name)
    })
    return output.join(", ")
  }
  render () {
    return (
      <Modal
        actions={[
          <Button flat modal="close" node="button">Close</Button>
        ]}
        bottomSheet={false}
        fixedFooter={false}
        id={this.props.paper.paper_id}
        open={false}
        trigger={<Button node="button" className='full resize'>{this.props.paper.title}</Button>}
      >
        <span><strong>Title: </strong>{this.props.paper.title}</span>
        <p><strong>Abstract: </strong>{this.props.paper.abstract}</p>
        <p><strong>Authors: </strong>{this.getAuthors()}</p>
      </Modal>
    )
  }
}
