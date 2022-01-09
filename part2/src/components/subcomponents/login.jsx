import React from 'react'
import { Row, Col, Button } from 'react-materialize'
import AuthenticationHelper from '../authenticationhelper'
import TextInput from './textinput'

export default class Login extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      email: "",
      password: ""
    }

    this.handleEmail = this.handleEmail.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
  }

  handleEmail = e => {
    this.setState({email: e.target.value})
  }

  handlePassword = e => {
    this.setState({password: e.target.value})
  }

  render(){

    let output = ""
    if(AuthenticationHelper.authenticated){
      output = (
        <Row>
          <Col s={4} m={4} l={4}>
            <Button>Logout</Button>
          </Col>
        </Row>
      )
    }else{
      output = (
        <Row>
        <Col s={4} m={4} l={4}>
          <TextInput placeholder='email' textValue={this.state.email} handleOnChange={this.handleEmail}/>
        </Col>
        <Col s={4} m={4} l={4}>
          <TextInput placeholder='password' textValue={this.state.password} handleOnChange={this.handlePassword}/>
        </Col>
        <Col s={2} m={2} l={2}>
          <Button>Login</Button>
        </Col>
        <Col s={2} m={2} l={2}>
          <Button>Signup</Button>
        </Col>
      </Row>
      )
    }

    return (
      <div className='slightly-more-margin'>
        {output}
      </div>
    )
  }
}