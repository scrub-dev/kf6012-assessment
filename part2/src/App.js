import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Authorpage from './components/pages/authorspage'
import Errorpage from './components/pages/errorpage'
import Homepage from './components/pages/homepage'
import Paperspage from './components/pages/paperspage'
import Navbar from './components/subcomponents/navbar'

const pages = [
  { name: 'home', paths: ['/', 'home'], component: <Homepage />, display: true },
  { name: 'papers', paths: ['papers'], component: <Paperspage />, display: true },
  { name: 'authors', paths: ['authors'], component: <Authorpage />, display: true },
  { name: 'error', paths: ['*'], component: <Errorpage />, display: false }
]

function generateRoutes (pages = []) {
  const output = []
  pages.forEach((page, i) => {
    page.paths.forEach(path => {
      output.push(<Route path={path} element={page.component} key={i + page.name} />)
    })
  })
  return output
}

function App () {
  return (
    <BrowserRouter>
      <div className='App'>
        <Navbar pages={pages} />
        <Routes>
          {generateRoutes(pages)}
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
