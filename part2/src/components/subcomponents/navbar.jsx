import React from 'react'
import pageconfig from '../pages/pageconfig'

export default class Navbar extends React.Component {
  render () {
    return (
      <nav>
        <div className='nav-wrapper main-bg'>
          <div className='left brand-logo'>
            <a href='home' className='accent-underline slight-margin'>KF6012 Assessment</a>
          </div>
          <ul className='right'>
            {pageconfig.generateLinks()}
          </ul>
        </div>
      </nav>
    )
  }
}
