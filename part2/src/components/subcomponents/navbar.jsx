import React from 'react'
import pageconfig from '../pages/pageconfig'
import Login from './login'

export default class Navbar extends React.Component {

  render () {
    return (
      <header>
        <nav>
          <div className='nav-wrapper main-bg'>
            <div className='left brand-logo'>
              <a href='home' className='accent-underline slight-margin'>KF6012 Assessment</a>
            </div>
            <ul className='right'>
              <li>{<Login authenticated={this.props.authenticated} setAuth={this.props.setAuth}/>}</li>
              {pageconfig.generateLinks(this.props.authenticated)}
            </ul>
          </div>
        </nav>
      </header>
    )
  }
}
