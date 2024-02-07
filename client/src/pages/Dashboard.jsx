import axios from 'axios'
import { TextInput , Label, Button } from 'flowbite-react'
import React, { useState } from 'react'
import { FaUser } from "react-icons/fa"
import { FaSignOutAlt } from 'react-icons/fa'
import { useSelector } from 'react-redux'
function Dashboard() {
  const { currentUser } = useSelector((state) => state.user)
  const [newUserName , setNewUserName] = useState(currentUser.userWihthoutPassword.username)
  const [email , setEmail] = useState(currentUser.userWihthoutPassword.email)
  const [password , setPassword]  = useState('')
  const updateInformation =(e)=>{
    e.preventDefault()
    axios.post('http://localhost:3000/updateInformation' , {email , newUserName , password}).then(
      (result)=>{
        console.log(result.data)
      }
    ).catch((err)=>{
      console.log(err.message)
    })
  }
  return (
    <div className='flex  min-h-screen mx-0 px-0 '>
      <div className='w-1/6 bg-gray-100 opacity-85 items-center flex-col mx-2'>
        <div className='flex space-x-1 items-center my-2 '>
          <FaUser className='mx-2' /><span> Profile</span>
        </div>
        <div className='flex space-x-1 items-center ' >
          <FaSignOutAlt className='mx-2' /><span> Sign out</span>
        </div>
      </div>
      <div className=' w-5/6 flex justify-center justify-items-center mt-20' >
        <div className='flex-col justify-center w-1/3'>
          <h1 className='font-bold font-xl items-center text-center my-2'>Profile</h1>
          <div className='flex justify-center'>
            <img src={currentUser.userWihthoutPassword.photoURL} className='w-16 h-16 rounded-full  border-4 border-gray-500 ' />
          </div>
          <form className='space-y-2 my-2' onSubmit={(e)=>{updateInformation(e)}}>
            <div>
              <TextInput type="email" value={email} onChange={(e)=>setEmail(e.target.value)}  placeholder="name@domain.com"  required />
            </div>
            <div>
              <TextInput type="text" value={newUserName} onChange={(e)=>setNewUserName(e.target.value)}  placeholder="username"   required />
            </div>
            <div>
              <TextInput type="password" value={password} onChange={(e)=>setPassword(e.target.value)}  placeholder="password"  required />
            </div>
            <Button type='submit' color='gray' outline className='w-full'>Update</Button>
            <div className='flex justify-between mt-2'>
              <div className='text-red-700'>Delete Account</div>
              <div className='text-red-700'>Sign out</div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Dashboard