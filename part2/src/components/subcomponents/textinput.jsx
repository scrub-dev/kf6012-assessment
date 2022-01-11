import React from 'react'
/**
 * @author: Scott Donaldson 19019810
 */
export default class TextInput extends React.Component {
  // Generates a text input field
  render(){
    return(
      <label>
        {this.props.label}
        <input type='text' onChange={this.props.handleOnChange} value={this.props.textValue} placeholder={this.props.placeholder}></input>
      </label>
    )
  }
}