import Authorpage from './authorspage'
import Errorpage from './errorpage'
import Homepage from './homepage'
import Paperspage from './paperspage'
import { Link, Route } from 'react-router-dom'
import ReadingListPage from './readinglistpage'
import SignupPage from './signuppage'
/**
 * @author: Scott Donaldson 19019810
 */
const pageconfig = {
  pages: (authenticated, authFunc) => {
    return [
      { name: 'home', paths: ['/', 'home'], component: <Homepage authenticated={authenticated}/>, display: true, requiresAuth: false},
      { name: 'papers', paths: ['papers'], component: <Paperspage authenticated={authenticated}/>, display: true, requiresAuth: false },
      { name: 'authors', paths: ['authors'], component: <Authorpage authenticated={authenticated}/>, display: true, requiresAuth: false },
      { name: 'error', paths: ['*'], component: <Errorpage/>, display: false, requiresAuth: false },
      { name: 'reading list', paths: ['readinglist'], component: <ReadingListPage authenticated={authenticated}/>, display: false, requiresAuth: true},
      { name: 'signup', paths: ['signup'], component: <SignupPage authenticated={authenticated} setAuth={authFunc}/>, display: false, requiresAuth: false}
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

  generateRoutes (authenticated, authFunc) {
    const output = []
    this.pages(authenticated, authFunc).forEach((page, i) => {
      page.paths.forEach(path => {
        output.push(<Route path={path} element={page.component} key={i + page.name} />)
      })
    })
    return output
  }
}

export default pageconfig
