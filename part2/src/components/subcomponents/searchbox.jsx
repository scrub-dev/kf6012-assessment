import React from 'react';
/**
 * @author: Scott Donaldson 19019810
 */
class SearchBox extends React.Component{
    // Returns a searchbox component
    render(){
        return(
            <label>
                Search 
                <input type='text' placeholder='search' value={this.props.search} onChange={this.props.handleSearch}></input>
            </label>
        )
    }
}

export default SearchBox