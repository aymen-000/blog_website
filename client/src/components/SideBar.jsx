import React, { useEffect, useState } from 'react'
import { Sidebar } from 'flowbite-react'
import { HiUser } from 'react-icons/hi';
import { FaSignOutAlt } from 'react-icons/fa'
import { useLocation } from 'react-router-dom';
function SideBar() {
    const location = useLocation()
    const [tab , setTab] = useState('')
    useEffect(()=>{
        const search = new URLSearchParams(location.search)
        setTab(search.get('tab'))
    } , location.search)
    return (
        <div className='max-sm:w-full'>
            <Sidebar aria-label="Default sidebar example" className='max-sm:w-full' >
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item active = { tab == 'profile'} icon={HiUser} href='/dashboard?tab=profile'>
                            Profile
                        </Sidebar.Item>
                        <Sidebar.Item icon={FaSignOutAlt} href='/'>
                            Sign out
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
        </div>
    )
}

export default SideBar