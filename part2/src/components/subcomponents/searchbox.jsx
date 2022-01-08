import React from 'react';

class SearchBox extends React.Component{
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