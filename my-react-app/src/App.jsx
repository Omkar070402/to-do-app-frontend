import React from 'react'
import Navbar from './Components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import My_Task from './Pages/My_Task'
import Login from './Pages/Login'
import Signup from './Pages/Signup'

const App = () => {
  return (

    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/mytask' element={<My_Task />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
      </Routes>
    </Router>

  )
}

export default App
