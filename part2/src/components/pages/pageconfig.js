import Authorpage from './authorspage'
import Errorpage from './errorpage'
import Homepage from './homepage'
import Paperspage from './paperspage'
import { Link, Route } from 'react-router-dom'

const pageconfig = {
  pages: [
    { name: 'home', paths: ['/', 'home'], component: <Homepage />, display: true },
    { name: 'papers', paths: ['papers'], component: <Paperspage />, display: true },
    { name: 'authors', paths: ['authors'], component: <Authorpage />, display: true },
    { name: 'error', paths: ['*'], component: <Errorpage />, display: false }
  ],
  uppercaseFirstLetter (string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  },
  generateLinks () {
    const output = []
    this.pages.forEach((page, i) => {
      const x = (
        <li key={i + page.name}><Link to={page.name} className='white-text'>{this.uppercaseFirstLetter(page.name)}</Link></li>
      )
      if (page.display) output.push(x)
    })
    return output
  },
  generateATags () {
    const output = []
    this.pages.forEach((page, i) => {
      const x = (
        <li key={i + page.name}><a href={page.name} className='white-text'>{this.uppercaseFirstLetter(page.name)}</a></li>
      )
      if (page.display) output.push(x)
    })
    return output
  },

  generateRoutes () {
    const output = []
    this.pages.forEach((page, i) => {
      page.paths.forEach(path => {
        output.push(<Route path={path} element={page.component} key={i + page.name} />)
      })
    })
    return output
  }
}

export default pageconfig
