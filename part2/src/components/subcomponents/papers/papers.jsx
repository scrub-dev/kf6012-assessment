import React from 'react'
import config from '../../../config'
import Paper from './paper'
import { Row, Button, Col } from 'react-materialize'
import Dropdown from '../dropdown'

export default class Papers extends React.Component {
  constructor (props) {
    super(props)
    this.state = { results: [] }
  }

  async componentDidMount () {
    let url = ((config.DEV_MODE) ? config.DEV_BASEPATH : config.BASEPATH) + 'papers'
    if (this.props.random !== undefined && this.props.random) url += '?getrandom'
    else if (this.props.paperid !== undefined) url += `?id=${this.props.paperid}`
    else if (this.props.authorid !== undefined) url += `?authorid=${this.props.authorid}`

    try {
      const res = await fetch(url)
      const data = await res.json()
      if (data.status !== 200) throw new Error((config.DEV_MODE) ? `API Error: ${data.status} | ${data.message} | ${url}` : 'API Error')
      this.setState({ results: data.results })
    } catch (e) {
      console.log('Something went wrong ', e)
    }
  }

  generatePageSize = (options) => {
    let output = []
    options.forEach( e => {
      output.push({name: `${e}`, value: e})
    })
    return output
  }

  render () {
    const filterFunctions = []

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

    let filteredResults = this.state.results
    filterFunctions.forEach( func => filteredResults = filteredResults.filter(func))



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
    return (
      <div>
        {buttons}
        <Row>
          {noData}
          {filteredResults.map((paper, i) => <Paper key={i + paper.title} paper={paper} size={filteredResults.length} authenticated={this.props.authenticated} rltype='add'/>)}
        </Row>
      </div>
    )
  }
}
