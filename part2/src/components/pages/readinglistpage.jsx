import React from 'react'
import Dropdown from '../subcomponents/dropdown'
import Footer from '../subcomponents/footer'
import config from '../../config'
import TextInput from '../subcomponents/textinput'
import { Row, Col } from 'react-materialize'
import Redirect from '../subcomponents/redirect'
import ReadingList from '../subcomponents/readinglist/readinglist'

export default class Paperspage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      award: "",
      search: "",
      page: 1,
      pageSize: 27,
      awards: [],
      readingList: []
    }

    this.handleAwardSelect = this.handleAwardSelect.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handlePageSizeSelect = this.handlePageSizeSelect.bind(this)
  
    this.handlePreviousClick = this.handlePreviousClick.bind(this)
    this.handleNextClick = this.handleNextClick.bind(this)

  }

  async componentDidMount () {

    let url = ((config.DEV_MODE) ? config.DEV_BASEPATH : config.BASEPATH) + 'awards'
    try{
      const res = await fetch(url)
      const data = await res.json()
      if (data.status !== 200) throw new Error((config.DEV_MODE) ? `API Error: ${data.status} | ${data.message} | ${url}` : 'API Error')
      this.setState({awards: data.results})
    }catch(e){
      console.log('Something went wrong ', e)
    }

    let rlurl = ((config.DEV_MODE) ? config.DEV_BASEPATH : config.BASEPATH) + 'readinglist'
    let formData = new FormData();
    formData.append('token', localStorage.getItem('authToken'))

    try{
      let res = await fetch(rlurl, {
        method:"POST",
        headers: new Headers(),
        body: formData
      })
      let data = await res.json()
      if(data.status === 200){
        this.setState({readingList: data.results})
      }
    }catch(e){
      console.log('Something went wrong ', e)
    }
  }

  handleAwardSelect = e => {
    this.setState({award: e.target.value, page: 1})
  }

  handleSearch = e => {
    this.setState({search: e.target.value, page: 1})
  }

  handlePageSizeSelect = e => {
    this.setState({pageSize: parseInt(e.target.value), page: 1})
  }

  handlePreviousClick = e => {
    this.setState({page: this.state.page - 1})
  }

  handleNextClick = e => {
    this.setState({page: this.state.page + 1})
  }



  awardsToOptions = () => {
    const awards = this.state.awards
    let arr = [{name: "All", value: "all"}]
    awards.forEach(e => {
      arr.push({name: e.name, value: e.award_type_id})
    })
    return arr
  }
  render(){
    return (
      <React.Fragment>
        <Redirect location='/home' redirect={!this.props.authenticated}/>
        <main className='wrapper'>
          <div className='container'>
            <h1 className='accent-underline'>Reading List</h1>
            <span>To add to reading list, navigate to Papers and Authors and add from there.</span>
            <Row>
              <Col s={12} m={6} l={6}>
                <TextInput label='Search' textValue={this.state.search} handleOnChange={this.handleSearch} placeholder='Title or Abstract'/>
              </Col>
              <Col s={12} m={6} l={6}>
                <Dropdown label='Awards' selectValue={this.state.award} handleSelect={this.handleAwardSelect} options={this.awardsToOptions()} includeAny/>
              </Col>
            </Row>
            <Row>
              <ReadingList
                page = {this.state.page}
                pageSize = {this.state.pageSize}
                handlePreviousClick = {this.handlePreviousClick}
                handleNextClick = {this.handleNextClick}
                handlePageSize = {this.handlePageSizeSelect}
                award = {this.state.award}
                search = {this.state.search}
                authenticated = {this.props.authenticated}
                readingList = {this.state.readingList}
              />
            </Row>
          </div>
        </main>
        <Footer/>
      </React.Fragment>
    )
  }
}