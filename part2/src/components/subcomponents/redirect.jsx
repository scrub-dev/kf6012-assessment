import React from 'react';

import { Navigate } from 'react-router-dom';

export default class Redirect extends React.Component {
  render(){
    return(
      (this.props.redirect) ? (<Navigate to={this.props.location}/>) : null
    )
  }
}