import React from 'react'
import pageconfig from './pageconfig'

export default class MenuPage extends React.Component {
  render(){
    return (
      <div className='ow-my-head'>
        {pageconfig.generateButtons(this.props.authenticated)}
      </div>
    )
  }
}