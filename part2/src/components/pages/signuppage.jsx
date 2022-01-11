import React from 'react'
import Footer from '../subcomponents/footer'
import config from '../../config'
import { Button, Modal, Row } from 'react-materialize'
import TextInput from '../subcomponents/textinput'
import Redirect from '../subcomponents/redirect'
/**
 * @author: Scott Donaldson 19019810
 */
export default class SignupPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      email: "",
      password: "",
      password2: "",
      output: ""
    }

    this.handleEmail = this.handleEmail.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
    this.handlePassword2 = this.handlePassword2.bind(this)

    this.handleSignup = this.handleSignup.bind(this)
  }

  handleEmail = e => {
    this.setState({email: e.target.value})
  }

  handlePassword = e => {
    this.setState({password: e.target.value})
  }

  handlePassword2 = e => {
    this.setState({password2: e.target.value})
  }

  handleSignup = async () => {
    this.setState({output: ""})

    // popup for if one of both fields are blank
    let missingParamModal = (
      <Modal
      actions={[<Button flat modal='close' node='button' onClick={this.clearOutput}>Close</Button>]}
      bottomSheet={false}
      fixedFooter={false}
      header='Missing Email or Password'
      open={true}
    >
      <p>Please fill in all the email and password fields correctly.</p>
    </Modal>
    )

    //pop up for if login is invalid or incorrect
    let incorrectModal = (
      (
        <Modal
        actions={[<Button flat modal='close' node='button' onClick={this.clearOutput}>Close</Button>]}
        bottomSheet={false}
        fixedFooter={false}
        header='Username or Password Incorrect'
        open={true}
      >
        <p>Please fill in all the email and password fields correctly.</p>
      </Modal>
      )
    )
    
    //trys to authenticate user
    let url = ((config.DEV_MODE) ? config.DEV_BASEPATH : config.BASEPATH) + 'authenticate'

    let formData = new FormData()
    formData.append('email', this.state.email)
    formData.append('password', this.state.password)
    formData.append('create', true);

    try{
      const res = await fetch(url, {
        method: "POST",
        headers: new Headers(),
        body: formData
      })
      const data = await res.json()
      if(data.status === 401) {
        this.setState({output: incorrectModal})
        if(this.state.password === '' 
        || this.state.email === '' 
        || this.state.password2 === ''
        || this.state.password2 !== this.state.password){
          this.setState({output: missingParamModal})
        }
      }
      if (data.status !== 200 && data.status !== 401) throw new Error((config.DEV_MODE) ? `API Error: ${data.status} | ${data.message} | ${url}` : 'API Error')
      if(data.results !== undefined && 'token' in data.results ){

        this.props.setAuth(true)
        localStorage.setItem('authToken', data.results.token)

        this.setState({
          email: "",
          password: "",
          password2: ""
        })
      }
    }catch (e) {
      console.log('Something went wrong ', e)
    }
  }
  render(){
    return (
      <div>
        <Redirect location='/home' redirect={this.props.authenticated}/>
        <React.Fragment>
          {this.state.output}
          <div className='tall container center-div'>
            <div className='centered'>
              <Row>
                <TextInput label='Email' placeholder='Email' textValue={this.state.email} handleOnChange={this.handleEmail}/>
              </Row>
              <Row>
                <TextInput label='Password' placeholder='Password' textValue={this.state.password} handleOnChange={this.handlePassword}/>
              </Row>
              <Row>
                <TextInput label='Confirm Password' placeholder='Confirm Password' textValue={this.state.password2} handleOnChange={this.handlePassword2}/>
              </Row>
              <Button onClick={this.handleSignup}>Create Account</Button>
            </div>
          </div>
          <Footer/>
        </React.Fragment>
      </div>
    )
  }
}