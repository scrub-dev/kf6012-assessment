import React from 'react'
import { Navigate } from 'react-router-dom'

export default class ReadingListPage extends React.Component {
  render(){


    if(!this.props.authenticated){
      return <Navigate to='/login'/>
    }
    return (
      <div>
      </div>
    )
  }
}