import { BrowserRouter, Routes } from 'react-router-dom'
import Navbar from './components/subcomponents/navbar'
import pageconfig from './components/pages/pageconfig'
import React from 'react';

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      authenticated: false,
      setAuthenticated: (val) => {
        this.setState({authenticated: val})
      }
    }
  }

  render(){
    return (
      <BrowserRouter>
        <div className='App'>
          <Navbar authenticated={this.state.authenticated} setAuth={this.state.setAuthenticated}/>
          <Routes>
            {pageconfig.generateRoutes(this.state.authenticated)}
          </Routes>
        </div>
      </BrowserRouter>
    )
  }
}
