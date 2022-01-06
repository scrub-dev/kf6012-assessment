import {Link} from 'react-router-dom'

import React from 'react';



export default class Navbar extends React.Component {
  uppercaseFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  generateNavbar(pages) {
    let output = []
    pages.forEach( (page, i) => {
      let x = (
        <li key={i + page.name}><Link to={page.name}>{this.uppercaseFirstLetter(page.name)}</Link></li>
      )
      if(page.display) output.push(x)
    })
    return output
  }

  render() {
    return (
      <nav>
        <div className='nav-wrapper main-bg'>
          <div className='left brand-logo'>
            <a href='#' className='accent-underline slight-margin'>KF6012 Assessment</a>
          </div>
          <ul className='right'>
            {this.generateNavbar(this.props.pages)}
          </ul>
        </div>
      </nav>
    )
  }
}