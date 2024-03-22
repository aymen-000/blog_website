import axios from 'axios'
import { TextInput , Label, Button } from 'flowbite-react'
import { set } from 'mongoose'
import React, { useEffect, useState } from 'react'
import { FaUser } from "react-icons/fa"
import { FaSignOutAlt } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import {useLocation, useParams} from 'react-router-dom'
import DashboardProfile from '../components/DashboardProfile'
import SideBar from '../components/Sidebar'
import Posts from './Posts'
import Users from './Users'
function Dashboard() {
  const location = useLocation()
  const [tab , setTab] = useState('')
  useEffect(()=>{
    const urlSearchParms = new URLSearchParams(location.search)
    setTab(urlSearchParms.get('tab'))
  }, [location.search])
  return (
    <div className='flex mx-0 px-0 max-sm:flex-col max-sm:space-y-3 '>
      <SideBar/>
      {
        tab =='profile' ? <DashboardProfile/> : tab =='posts' ? <Posts/> : tab == 'users' ? <Users/> : <div></div>
      }
    </div>
  )
}

export default Dashboard