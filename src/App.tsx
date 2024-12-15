import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Doctors from './Pages/Doctors'
import Ambulances from './Pages/Ambulances'
import Home from './Pages/Home'

function App() {

  return (
    <>
      <div className='App'>
        <BrowserRouter>
          <Routes>
            <Route path='/' Component={Home}></Route>
            <Route path='/doctors' Component={Doctors}></Route>
            <Route path='/ambulances' Component={Ambulances}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
