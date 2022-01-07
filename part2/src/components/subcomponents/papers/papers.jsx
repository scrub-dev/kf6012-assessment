import React from 'react'
import config from '../../../config'
import Paper from './paper'
import { Collapsible } from 'react-materialize'

export default class Papers extends React.Component {
  constructor (props) {
    super(props)
    this.state = { results: [] }
  }

  async componentDidMount () {
    let url = ((config.DEV_MODE) ? config.DEV_BASEPATH : config.BASEPATH) + 'papers'
    if (this.props.random !== undefined && this.props.random) url += '?getrandom'
    else if (this.props.paperid !== undefined) url += `?id=${this.props.paperid}`
    else if (this.props.award !== undefined) url += `?award=${this.props.award}`
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

  render () {
    const filterFunctions = []

    if (this.props.search !== '' && this.props.search !== undefined) {
      filterFunctions.push(paper => {
        (paper.title.toLowerCase().includes(this.props.search.toLowerCase()) ||
        paper.abstract.toLowerCase().includes(this.props.search.toLowerCase()))
      })
    }

    // if (this.props.award !== '' && this.props.award !== undefined) {
    //   filterFunctions.push(paper => {
    //     (paper.award_id === this.props.award || this.props.award === "")
    //   })
    // }

    let filteredResults = this.state.results
    filterFunctions.forEach( func => filteredResults = filteredResults.filter(func))

    let buttons = ""
    if(this.props.page !== undefined){
      let pageSize = this.props.pageSize || 10
      let pageMax = this.props.page * pageSize
      let pageMin = pageMax - pageSize

      buttons = (
        <div>
          <button onClick={this.props.handlePreviousClick} disabled={this.props.page <= 1}>Previous</button>
          <button onClick={this.props.handleNextClick} disabled={this.props.page >= Math.ceil(filteredResults.length / pageSize)}>Next</button>
          <p>Page {this.props.page} of {Math.ceil(filteredResults.length / pageSize)}</p>
        </div>
      )
      filteredResults = filteredResults.slice(pageMin, pageMax)
    }

    let noData = ""
    if(!this.state.results.length || !filteredResults.length) noData = <p>No Papers</p>

    return (
      <div>
        {noData}
        {buttons}
        <Collapsible accordion>
        {filteredResults.map((paper, i) => <Paper key={i + paper.title} paper={paper}/>)}
        </Collapsible>
      </div>
    )
  }
}
