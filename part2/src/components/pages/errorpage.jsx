import React from 'react'
import Footer from '../subcomponents/footer'
/**
 * @author: Scott Donaldson 19019810
 */
export default class Errorpage extends React.Component {
  render () {
    return (
      <div>
        <main className='wrapper'>
          <div className='container'>
            <h1 className='accent-underline'>Oops</h1>
          </div>
        </main>
        <Footer />
      </div>
    )
  }
}
