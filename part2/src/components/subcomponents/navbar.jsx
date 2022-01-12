import React from 'react'
import pageconfig from '../pages/pageconfig'
import Login from './login'
import LoginButton from './loginbutton'
import MenuButton from './menubutton'
/**
 * @author: Scott Donaldson 19019810
 */
export default class Navbar extends React.Component {

  // Generates nav bar from pageconfig options
  render () {
    return (
      <header>
        <nav>
          <div className='nav-wrapper main-bg'>
            <div className='left brand-logo'>
              <a href='home' className='accent-underline slight-margin hide-on-mobile'>KF6012 Assessment</a>
            </div>
            <ul className='right hide-on-mobile'>
              <li>{<Login authenticated={this.props.authenticated} setAuth={this.props.setAuth}/>}</li>
              {pageconfig.generateLinks(this.props.authenticated)}
            </ul>
            <ul className='show-on-mobile right'>
              <li className='slight-margin'>{<LoginButton/>}</li>
              <li className='slight-margin'>{<MenuButton/>}</li>
            </ul>
          </div>
        </nav>
      </header>
    )
  }
}