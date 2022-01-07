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
  }
}