import React from 'react'
import config from '../../../config'
import Author from './author'
import { Row, Button, Col } from 'react-materialize'
import Dropdown from '../dropdown'
/**
 * @author: Scott Donaldson 19019810
 */
export default class Authors extends React.Component {
  constructor (props){
    super(props)
    this.state = {results: []}
  }

  async componentDidMount () {

    // get all authors or author if ID is set
    let url = ((config.DEV_MODE) ? config.DEV_BASEPATH : config.BASEPATH) + 'authors'
    if(this.props.authorid !== undefined) url += `?id=${this.props.authorid}`

    try{
      const res = await fetch(url)
      const data = await res.json()
      if (data.status !== 200) throw new Error((config.DEV_MODE) ? `API Error: ${data.status} | ${data.message} | ${url}` : 'API Error')
      this.setState({results: data.results})
    }catch (e) {
      console.log('Something went wrong ', e)
    }
  }
  // dynamically change grid size based on how many results are showing
  generatePageSize = (options) => {
    let output = []
    options.forEach( e => {
      output.push({name: `${e}`, value: e})
    })
    return output
  }

  // generate name to search with as one  variable instead of an object
  parseName = (author) => {
    const f = (author.first_name !== undefined) ? author.first_name : ""
    const m = (author.middle_name !== undefined) ? author.middle_name + " " : " "
    const l = (author.last_name !== undefined) ? author.last_name : ""

    return `${f} ${m}${l}`
  }

  render(){
    // create an array for functions
    const filterFunctions = []

    //if params match, add anon func to array
    if(this.props.search !== undefined && this.props.search !== ''){
      filterFunctions.push(author => {
        return this.parseName(author).toLowerCase().includes(this.props.search.toLowerCase())
      })
    }
    // go over each anon func in array so can combined search parameters
    let filteredResults = this.state.results
    filterFunctions.forEach( func => filteredResults = filteredResults.filter(func))

    // generate buttons if the component is required to render like a page
    let buttons = "" 
    if(this.props.page !== undefined){
      let pageSize = this.props.pageSize || 10
      let pageMax = this.props.page * pageSize
      let pageMin = pageMax - pageSize

      const pageSizeOptions = [9,18,27]
      const page = (filteredResults.length === 0)? 0 : this.props.page

      buttons = (
        <div>
          <Row>
            <Col>
              <Button onClick={this.props.handlePreviousClick} disabled={this.props.page <= 1}>Previous</Button>
            </Col>
            <Col>
              <Button onClick={this.props.handleNextClick} disabled={this.props.page >= Math.ceil(filteredResults.length / pageSize)}>Next</Button>
            </Col>
            <Col className='right'>
              <Dropdown label='Authors per Page' selectValue={this.props.pageSize} handleSelect={this.props.handlePageSize} options={this.generatePageSize(pageSizeOptions)}/>
            </Col>
            <Col>
              <p>Page {page} of {Math.ceil(filteredResults.length / pageSize)}</p>
            </Col>
          </Row>
        </div>
      )
      filteredResults = filteredResults.slice(pageMin, pageMax)
    }

    let noData = ""
    if(!this.state.results.length || !filteredResults.length) noData = <p>No Authors</p>
    return (
      <div>
        {buttons}
        <Row>
          {noData}
          {filteredResults.map((author, i) => <Author author={author} key={i + author.first_name} size={filteredResults.length} authenticated={this.props.authenticated}/>)}
        </Row>
      </div>
    )
  }
}