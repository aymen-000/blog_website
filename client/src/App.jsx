import React from 'react'
import { Route ,Routes , BrowserRouter  } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Signin from './pages/Signin'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import axios from 'axios'

function App() {
  return (
    <Routes>
      <Route element={<Home/>} path='/:id'/>
      <Route element={<About/>} path='/About'/>
      <Route element={<Projects/>} path='/Projects'/>
      <Route element={<Dashboard/>} path='/dashboard'/>
      <Route element={<SignUp/>} path='/signup'/>
      <Route element={<Signin/>} path='/signIn'/>
    </Routes>
  )
}

export default App
