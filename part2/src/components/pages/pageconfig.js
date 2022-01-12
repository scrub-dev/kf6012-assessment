import Authorpage from './authorspage'
import Errorpage from './errorpage'
import Homepage from './homepage'
import Paperspage from './paperspage'
import { Link, Route } from 'react-router-dom'
import ReadingListPage from './readinglistpage'
import SignupPage from './signuppage'
import MenuPage from './menupage'
import Login from '../subcomponents/login'
import RedirectButton from '../subcomponents/redirectbutton'
import { Col, Row } from 'react-materialize'
/**
 * @author: Scott Donaldson 19019810
 */
const pageconfig = {
  //Pages Array that degines their paths, component to render and if they should be displayed in nav bar or if you need to be authenticated to access them
  pages: (authenticated, authFunc) => {
    return [
      { name: 'home', paths: ['/', 'home'], component: <Homepage authenticated={authenticated}/>, display: true, requiresAuth: false},
      { name: 'papers', paths: ['papers'], component: <Paperspage authenticated={authenticated}/>, display: true, requiresAuth: false },
      { name: 'authors', paths: ['authors'], component: <Authorpage authenticated={authenticated}/>, display: true, requiresAuth: false },
      { name: 'error', paths: ['*'], component: <Errorpage/>, display: false, requiresAuth: false },
      { name: 'reading list', paths: ['readinglist'], component: <ReadingListPage authenticated={authenticated}/>, display: false, requiresAuth: true},
      { name: 'signup', paths: ['signup'], component: <SignupPage authenticated={authenticated} setAuth={authFunc}/>, display: false, requiresAuth: false},
      { name: 'menu', paths: ['menu'], component: <MenuPage authenticated={authenticated}/>, display: false, requiresAuth: false},
      { name: 'login', paths: ['login'], component: <Login authenticated={authenticated} setAuth={authFunc}/>, display: false, requiresAuth: false}
    ]
  },
  //Changers First Character to upperstring
  uppercaseFirstLetter (string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  },
  //Generates Links for Navbar
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
  //Generates Links as Anchors with Hrefs
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
  //Generates Routes for react-router-dom
  generateRoutes (authenticated, authFunc) {
    const output = []
    this.pages(authenticated, authFunc).forEach((page, i) => {
      page.paths.forEach(path => {
        output.push(<Route path={path} element={page.component} key={i + page.name} />)
      })
    })
    return output
  },
  generateButtons (authenticated, authFunc) {
    const output = []
    this.pages(authenticated, authFunc).forEach((page, i) => {
      const x = (
        <Row key={page.name}>
          <Col s={12} m={12} l={12} key={page.name}>
            <RedirectButton location={page.name} key={page.name} name={this.uppercaseFirstLetter(page.name)}/>
          </Col>
        </Row>
      )
      if (page.display  || (page.requiresAuth && authenticated)) output.push(x)
    })
    return output
  }
}

export default pageconfig
