import React from 'react'

export default class Paper extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      display: false
    }
  }

  handleClick = () => {
    if(this.props.showDetails) this.setState({display: !this.state.display})
  }

  render(){
    let details = ""
    if(this.state.display){
      details = <div>
                  <p>{this.props.paper.abstract}</p>
                </div>
    }
    return(
      <div onClick={this.handleClick}>
        <p>this.props.paper.title</p>
        {details}
      </div>
    )
  }
}