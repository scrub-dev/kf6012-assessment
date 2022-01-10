import React from 'react'
import Footer from '../subcomponents/footer'
import Redirect from '../subcomponents/redirect'

export default class ReadingListPage extends React.Component {
  render(){


    if(!this.props.authenticated){

    }
    return (
      <React.Fragment>
        <Redirect location='/home' redirect={!this.props.authenticated}/>
        <main className='wrapper'>
          <div className='container'>
            <h1 className='accent-underline'>Reading List</h1>
          </div>
        </main>
        <Footer/>
      </React.Fragment>
    )
  }
}