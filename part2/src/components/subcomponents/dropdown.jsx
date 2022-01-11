import React from 'react'
/**
 * @author: Scott Donaldson 19019810
 */
export default class Dropdown extends React.Component {
  render(){
    let any = <option key='0any' value="">Any</option>
    return(
      <label>
        {this.props.label}
        <select value={this.props.selectValue} onChange={this.props.handleSelect} className='browser-default'>
          {(this.props.includeAny)? any : ""}
          {this.props.options.map(e => (<option key={e.value + e.name} value={e.value}>{e.name}</option>))}
        </select>
      </label>
    )
  }
}