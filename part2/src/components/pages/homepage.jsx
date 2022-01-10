import React from 'react'
import Footer from '../subcomponents/footer'
import bookshelf from '../../assets/bookshelf.jpg'
import Papers from '../subcomponents/papers/papers'

export default class Homepage extends React.Component {
  render () {
    return (
      <React.Fragment>
        <main className='wrapper'>
          <div className='container'>
            <h1 className='accent-underline'>Home</h1>
            <p>Student Name: Scott Donaldson</p>
            <p>Student ID: W19019810</p>
            <p>This website is part of university coursework and not associated with or endorsed by the DIS Conference</p>
            <Papers random={true} authenticated={this.props.authenticated}/>
            <div className='image-center'>
              <img src={bookshelf} alt='bookshelf' className='homepage-image' />
            </div>
          </div>
        </main>
        <Footer />
      </React.Fragment>
    )
  }
}
