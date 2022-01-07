import { BrowserRouter, Routes } from 'react-router-dom'
import Navbar from './components/subcomponents/navbar'
import pageconfig from './components/pages/pageconfig'

function App () {
  return (
    <BrowserRouter>
      <div className='App'>
        <Navbar />
        <Routes>
          {pageconfig.generateRoutes()}
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
