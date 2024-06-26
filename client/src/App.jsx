import React from 'react'
import { Route ,Routes , BrowserRouter  } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Signin from './pages/Signin'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import axios from 'axios'
import PrivateRoute from './components/PrivateRoute'
import PostPrivateRoute from './components/PostPrivateRoute'
import AddPost from './pages/AddPost'
import SinglePost from './pages/SinglePost'
import UpdatePost from './pages/UpdatePost'
import PostPgae from './pages/PostPgae'
function App() {
  return (
    <Routes>
      <Route element={<Home/>} path='/'/>
      <Route element={<About/>} path='/About'/>
      <Route element={<Projects/>} path='/Projects'/>
      <Route element={<PrivateRoute/>}>
        <Route element={<Dashboard/>} path='/dashboard'/>
      </Route>
      <Route element={<PostPrivateRoute/>} >
        <Route element={<AddPost/>} path='/add-post'/>
        <Route element={<UpdatePost/>} path='/dashboard/posts/update/:id'/>
      </Route>
      <Route element={<SignUp/>} path='/signup'/>
      <Route element={<Signin/>} path='/signIn'/>
      <Route element={<PostPgae/>} path='/posts/:id'/>
    </Routes>
  )
}

export default App
