import React, { Children } from 'react'
import { useSelector } from 'react-redux'
import { Outlet , Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
function PrivateRoute() {
    const navigate = useNavigate()
    const {currentUser} = useSelector((state)=>state.user)
  return (
    currentUser  ? <Outlet/> : <Navigate to="/signIn"/>
  )
}

export default PrivateRoute