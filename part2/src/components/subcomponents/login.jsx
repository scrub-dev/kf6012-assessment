import React from 'react'
import { Row, Col, Button, Modal } from 'react-materialize'
import TextInput from './textinput'
import config from '../../config'
import { useNavigate } from 'react-router-dom'
import SignupButton from './signupbutton'
/**
 * @author: Scott Donaldson 19019810
 */
export default class Login extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      email: "",
      password: "",
      output: ""
    }

    this.handleEmail = this.handleEmail.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
    
    this.handleLoginClick = this.handleLoginClick.bind(this)
    this.handleLogoutClick = this.handleLogoutClick.bind(this)
  }

  handleEmail = e => {
    this.setState({email: e.target.value})
  }

  handlePassword = e => {
    this.setState({password: e.target.value})
  }

  handleLogoutClick = () => {
    this.props.setAuth(false)
    localStorage.removeItem('authToken')
  }

  clearOutput = () => {
    this.setState({output: ''})
  }

  handleSignupClick = () => {
    const navigate = useNavigate()
    navigate("/signup")
  }

  handleLoginClick = async () => {
    this.setState({output: ""})
    let missingParamModal = (
      <Modal
      actions={[<Button flat modal='close' node='button' onClick={this.clearOutput}>Close</Button>]}
      bottomSheet={false}
      fixedFooter={false}
      header='Missing Email or Password'
      open={true}
    >
      <p>Please fill in both the email and password fields correctly.</p>
    </Modal>
    )

    let incorrectModal = (
      (
        <Modal
        actions={[<Button flat modal='close' node='button' onClick={this.clearOutput}>Close</Button>]}
        bottomSheet={false}
        fixedFooter={false}
        header='Username or Password Incorrect'
        open={true}
      >
        <p>Please fill in both the email and password fields correctly.</p>
      </Modal>
      )
    )

    let url = ((config.DEV_MODE) ? config.DEV_BASEPATH : config.BASEPATH) + 'authenticate'

    let formData = new FormData()
    formData.append('email', this.state.email)
    formData.append('password', this.state.password)

    try{
      const res = await fetch(url, {
        method: "POST",
        headers: new Headers(),
        body: formData
      })
      const data = await res.json()
      if(data.status === 401) {
        this.setState({output: incorrectModal})
        if(this.state.password === '' || this.state.email === ''){
          this.setState({output: missingParamModal})
        }
      }
      if (data.status !== 200 && data.status !== 401) throw new Error((config.DEV_MODE) ? `API Error: ${data.status} | ${data.message} | ${url}` : 'API Error')
      if(data.results !== undefined &&'token' in data.results ){

        this.props.setAuth(true)
        localStorage.setItem('authToken', data.results.token)
      }
    }catch (e) {
      console.log('Something went wrong ', e)
    }
  }

  render(){
    let output = ""
    if(this.props.authenticated){
      output = (
        <Row>
          <Col s={4} m={4} l={4}>
            <Button onClick={this.handleLogoutClick}>Logout</Button>
          </Col>
        </Row>
      )
    }else{
      output = (
        <Row>
          {this.state.output}
        <Col s={4} m={4} l={4}>
          <TextInput placeholder='email' textValue={this.state.email} handleOnChange={this.handleEmail}/>
        </Col>
        <Col s={4} m={4} l={4}>
          <TextInput placeholder='password' textValue={this.state.password} handleOnChange={this.handlePassword}/>
        </Col>
        <Col s={2} m={2} l={2}>
          <Button onClick={this.handleLoginClick}>Login</Button>
        </Col>
        <Col s={2} m={2} l={2}>
          <SignupButton/>
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