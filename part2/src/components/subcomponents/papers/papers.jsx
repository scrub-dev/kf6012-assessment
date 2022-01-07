import React from 'react'
import Paper from './paper'
import config from '../../../config'

export default class Papers extends React.Component {
  constructor (props){
    super(props)
    this.state ={ results: []}
  }

  componentDidMount() {
    let url = config.BASEPATH + "papers"

    if(this.props.random !== undefined) url += "?getrandom"
    else if (this.props.paperid !== undefined) url += `?id=${this.props.paperid}`
    else if (this.props.award !== undefined) url += `?award=${this.props.award}`
    else if (this.props.authorid !== undefined) url += `?authorid=${this.props.authorid}`

    try {
      let res = await fetch(url)
      let data = await res.json()
      if(data.status !== 200) throw new Error ((config.DEV_MODE)? `API Error: ${data.status} | ${data.message} | ${url}` : `API Error`) 
      this.setState({results: data.results})
    }catch(e){
      console.log("Something went wrong ", e)
    }
  }

  render(){
    return (
      <div>
        
      </div>
    )
  }
}