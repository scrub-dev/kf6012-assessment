import React from 'react'
import pageconfig from '../pages/pageconfig'

export default class Footer extends React.Component {
  render () {
    return (
      <footer className='page-footer footer'>
        <div className='container'>
          <div className='row'>
            <div className='col l6 s12'>
              <h5 className='accent-underline'>Student Information</h5>
              <p className='grey-text text-lighten-4'> © Scott Donaldson 19019810</p>
              <p className='grey-text text-lighten-4'>This website is part of university coursework and not associated with or endorsed
                by the DIS Conference
              </p>
            </div>
            <div className='col l4 offset-l2 s12'>
              <h5 className='white-text accent-underline'>Links</h5>
              <ul>
                {pageconfig.generateATags()}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}
