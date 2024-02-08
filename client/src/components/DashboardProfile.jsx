import { TextInput , Label, Button } from 'flowbite-react'
import { set } from 'mongoose'
import React, { useEffect, useState } from 'react'
import { FaUser } from "react-icons/fa"
import { FaSignOutAlt } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import {useLocation, useParams} from 'react-router-dom'
function DashboardProfile() {
    const { currentUser } = useSelector((state) => state.user)
    const [newUserName , setNewUserName] = useState(currentUser.userWihthoutPassword.username)
    const [email , setEmail] = useState(currentUser.userWihthoutPassword.email)
    const [password , setPassword]  = useState('')
    return (
        <div className=' w-5/6 flex justify-center justify-items-center mt-20 mb-20 max-sm:w-full mx-auto px-5' >
            <div className='flex-col justify-center w-1/3 max-sm:w-full max-lg:w-2/3  '>
                <h1 className='font-bold font-xl items-center text-center my-2'>Profile</h1>
                <div className='flex justify-center'>
                    <img src={currentUser.userWihthoutPassword.photoURL} className='w-16 h-16 rounded-full  border-4 border-gray-500 ' />
                </div>
                <form className='space-y-2 my-2 max-sm:mb-20' onSubmit={(e) => { updateInformation(e) }}>
                    <div>
                        <TextInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@domain.com" required />
                    </div>
                    <div>
                        <TextInput type="text" value={newUserName} onChange={(e) => setNewUserName(e.target.value)} placeholder="username" required />
                    </div>
                    <div>
                        <TextInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" required />
                    </div>
                    <Button type='submit' color='gray' outline className='w-full'>Update</Button>
                    <div className='flex justify-between mt-2'>
                        <div className='text-red-700'>Delete Account</div>
                        <div className='text-red-700'>Sign out</div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DashboardProfile