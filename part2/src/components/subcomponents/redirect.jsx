import React from 'react';

import { Navigate } from 'react-router-dom';
/**
 * @author: Scott Donaldson 19019810
 */
export default class Redirect extends React.Component {
    // component to allow other parent components redirect
    render(){
    return(
      (this.props.redirect) ? (<Navigate to={this.props.location}/>) : null
    )
  }
}