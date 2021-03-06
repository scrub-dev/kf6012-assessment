import React from 'react'
import { Modal, Button, Col } from 'react-materialize'
import Papers from '../papers/papers'
/**
 * @author: Scott Donaldson 19019810
 */
export default class Author extends React.Component {

  // changes grid size based on how many results are on the page dynamically
  generateDynamicSize = () => {
    if(this.props.size === 1 || this.props.size === 0) return {s: 12, m: 12, l: 12}
    else if (this.props.size <= 9) return {s: 12, m: 12, l: 12}
    else if (this.props.size <= 18) return {s: 6, m: 6, l: 6}
    else return {s: 12, m: 4, l: 4}
  }

  // Changes name from 3 objects to one variable
  parseName = (author) => {
    const f = (author.first_name !== undefined) ? author.first_name : ""
    const m = (author.middle_name !== undefined) ? author.middle_name + " " : " "
    const l = (author.last_name !== undefined) ? author.last_name : ""

    return `${f} ${m}${l}`
  }
  render(){
    let gds = this.generateDynamicSize()
    return (
      <Col s={gds.s} m={gds.m} l={gds.l}>
        <Modal
          actions={[
            <Button flat modal='close' node='button'>Close</Button>
          ]}
          bottomSheet={false}
          fixedFooter={false}
          id={this.props.author.author_id}
          open={false}
          trigger={<Button node='button' className='full resize top-padding'>{this.parseName(this.props.author)}</Button>}
        >
          <span><strong>{this.props.author.first_name}'s Papers: </strong></span>
          <Papers authorid={this.props.author.author_id} authenticated={this.props.authenticated}/>
        </Modal>
      </Col>
    )
  }
}