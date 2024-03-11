import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet , Navigate } from 'react-router-dom'
import Signin from '../pages/Signin'
function PostPrivateRoute() {
    const {currentUser} = useSelector(state =>state.user  )
  return (
    currentUser?.userWihthoutPassword.isAdmin ? <Outlet/> : <Navigate to={<Signin/>}/>
  )
}

export default PostPrivateRoute