import React from 'react'
import { Col, Row } from 'react-materialize'
import Footer from '../subcomponents/footer'
import TextInput from '../subcomponents/textinput'
import Authors from '../subcomponents/authors/authors'

/**
 * @author: Scott Donaldson 19019810
 */
export default class Authorpage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      search: "",
      page: 1,
      pageSize: 27
    }

    this.handleSearch = this.handleSearch.bind(this)
    this.handlePageSizeSelect = this.handlePageSizeSelect.bind(this)

    this.handlePreviousClick = this.handlePreviousClick.bind(this)
    this.handleNextClick = this.handleNextClick.bind(this)
  }

  handleSearch = e => {
    this.setState({search: e.target.value, page: 1})
  }

  handlePreviousClick = e => {
    this.setState({page: this.state.page - 1})
  }

  handleNextClick = e => {
    this.setState({page: this.state.page + 1})
  }
  handlePageSizeSelect = e => {
    this.setState({pageSize: e.target.value})
  }
  render () {
    return (
      <div>
        <main className='wrapper'>
          <div className='container'>
            <h1 className='accent-underline'>Authors</h1>
            <Row>
              <Col s={12} m={6} l={6}>
                <TextInput label='search' textValue={this.state.search} handleOnChange={this.handleSearch} placeholder='Author Name'/>
              </Col>
            </Row>
            <Row>
              <Authors
                page={this.state.page}
                pageSize={this.state.pageSize}
                handlePageSize = {this.handlePageSizeSelect}
                handlePreviousClick={this.handlePreviousClick}
                handleNextClick={this.handleNextClick}
                search={this.state.search}
                authenticated={this.props.authenticated}
              />
            </Row>
          </div>
        </main>
        <Footer />
      </div>
    )
  }
}
