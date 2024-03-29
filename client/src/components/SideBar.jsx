import React, { useEffect, useState } from 'react'
import { Sidebar } from 'flowbite-react'
import { HiUser } from 'react-icons/hi';
import { FaSignOutAlt } from 'react-icons/fa'
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signInSucess } from '../redux/user/userSlice';
import { PiUsersThree } from "react-icons/pi";
import { useSelector } from 'react-redux';

import axios from'axios';
function SideBar() {
    const location = useLocation()
    const {currentUser} = useSelector((state)=>state.user)
    const admin =currentUser?.userWihthoutPassword?.isAdmin
    const [tab , setTab] = useState('')
    const dispatch = useDispatch()
    const signOut = (e) => {
        e.preventDefault()
        axios.get('http://localhost:3000/api/signout').then((result)=>{
            console.log("done")
            console.log(result.data)
            dispatch(signInSucess(null))
        }).catch((err)=>{
            console.log('err')
            console.log(err.message)
        })
    }
    useEffect(()=>{
        const search = new URLSearchParams(location.search)
        setTab(search.get('tab'))
    } , [location.search])
    return (
        <div className='max-sm:w-full'>
            <Sidebar aria-label="Default sidebar example" className='max-sm:w-full' >
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item active = { tab == 'profile'} icon={HiUser} href='/dashboard?tab=profile'>
                            <div>Profile</div>
                        </Sidebar.Item>
                        {admin && <Sidebar.Item active = { tab == 'posts'} icon={HiUser} href='/dashboard?tab=posts'>
                            <div>Posts</div>
                        </Sidebar.Item>}
                        {admin && <Sidebar.Item icon={PiUsersThree}active = { tab == 'users'} href='/dashboard?tab=users'>
                            <div >Users</div>
                        </Sidebar.Item>}
                        <Sidebar.Item icon={FaSignOutAlt} href='/'>
                            <div onClick={(e)=>{signOut(e)}}>Signout</div>
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
        </div>
    )
}

export default SideBar