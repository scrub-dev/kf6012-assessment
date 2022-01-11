import React from 'react'
import config from '../../../config'
import { Row, Button, Col } from 'react-materialize'
import Dropdown from '../dropdown'
import Paper from '../papers/paper'
/**
 * @author: Scott Donaldson 19019810
 */
export default class ReadingList extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      results: []
    }

    this.handleRemoved = this.handleRemoved.bind(this)
  }

  handleRemoved = paperid => {
    this.setState({results: this.state.results.filter(paper => paper.paper_id !== paperid)})
  }

  getReadingList() {
    let output = []
    this.props.readingList.forEach(x => {
      output.push(x.paper_id)
    })
    return output
  }

  async componentDidMount () {
    // get all papers
    let url = ((config.DEV_MODE) ? config.DEV_BASEPATH : config.BASEPATH) + 'papers'

    try{
      const res = await fetch(url)
      const data = await res.json()
      if (data.status !== 200) throw new Error((config.DEV_MODE) ? `API Error: ${data.status} | ${data.message} | ${url}` : 'API Error')
      this.setState({results: data.results.filter(paper => this.getReadingList().includes(paper.paper_id))})
    }catch(e){
      console.log('Something went wrong ', e)
    }
  }
  // generate pagesize dropdown options
  generatePageSize = (options) => {
    let output = []
    options.forEach( e => {
      output.push({name: `${e}`, value: e})
    })
    return output
  }

  render(){
    const filterFunctions = []
    // filters
    if (this.props.search !== '' && this.props.search !== undefined) {
      filterFunctions.push(paper => {
        return (paper.title.toLowerCase().includes(this.props.search.toLowerCase()) ||
        paper.abstract.toLowerCase().includes(this.props.search.toLowerCase()))
      })
    }
    if (this.props.award !== '' && this.props.award !== undefined) {
      filterFunctions.push(paper => {
        if(this.props.award.toLowerCase() === 'all') return (paper.awards.length > 0)
        else {
          const awards = []
          paper.awards.forEach( e => { awards.push(parseInt(e.award_id)) })
          return awards.includes(parseInt(this.props.award))
        }
      })
    }
    // loop over filters
    let filteredResults = this.state.results
    filterFunctions.forEach( func => filteredResults = filteredResults.filter(func))

    // generate buttons if part of a page
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
              <Dropdown label='Papers per Page' selectValue={this.props.pageSize} handleSelect={this.props.handlePageSize} options={this.generatePageSize(pageSizeOptions)}/>
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
    if(!this.state.results.length || !filteredResults.length) noData = <p>No Papers</p>
    return(
      <div>
      {buttons}
      <Row>
        {noData}
        {filteredResults.map((paper, i) => <Paper key={i + paper.title} paper={paper} size={filteredResults.length} authenticated={this.props.authenticated} rltype='remove' rlaction={this.handleRemoved}/>)}
      </Row>
    </div>
    )
  }
}