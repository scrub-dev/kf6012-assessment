import Authorpage from './authorspage'
import Errorpage from './errorpage'
import Homepage from './homepage'
import Paperspage from './paperspage'
import { Link, Route } from 'react-router-dom'
import LoginPage from './loginpage'
import ReadingListPage from './readinglistpage'

const pageconfig = {
  pages: (authenticated) => {
    return [
      { name: 'home', paths: ['/', 'home'], component: <Homepage authenticated={authenticated}/>, display: true, requiresAuth: false},
      { name: 'papers', paths: ['papers'], component: <Paperspage authenticated={authenticated}/>, display: true, requiresAuth: false },
      { name: 'authors', paths: ['authors'], component: <Authorpage authenticated={authenticated}/>, display: true, requiresAuth: false },
      { name: 'error', paths: ['*'], component: <Errorpage/>, display: false, requiresAuth: false },
      { name: 'login', paths: ['login'], component: <LoginPage/>, display: false, requiresAuth: false},
      { name: 'reading list', paths: ['readinglist'], component: <ReadingListPage authenticated={authenticated}/>, display: false, requiresAuth: true}
    ]
  },
  uppercaseFirstLetter (string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  },
  generateLinks (authenticated) {
    const output = []
    this.pages(authenticated).forEach((page, i) => {
      const x = (
        <li key={i + page.name}><Link to={"/" + page.name.replace(/\s/g, '')} className='white-text'>{this.uppercaseFirstLetter(page.name)}</Link></li>
      )
      if (page.display || (page.requiresAuth && authenticated)) output.push(x)
    })
    return output
  },
  generateATags (authenticated) {
    const output = []
    this.pages(authenticated).forEach((page, i) => {
      const x = (
        <li key={i + page.name}><a href={page.name} className='white-text'>{this.uppercaseFirstLetter(page.name)}</a></li>
      )
      if (page.display  || (page.requiresAuth && authenticated)) output.push(x)
    })
    return output
  },

  generateRoutes (authenticated) {
    const output = []
    this.pages(authenticated).forEach((page, i) => {
      page.paths.forEach(path => {
        output.push(<Route path={path} element={page.component} key={i + page.name} />)
      })
    })
    return output
  }
}

export default pageconfig
