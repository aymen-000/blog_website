import { Card, TextInput, Label, Button, Alert, Spinner } from 'flowbite-react'

import { useNavigate } from 'react-router-dom';
import {  useDispatch, useSelector } from 'react-redux';
import { signInFailure , signInStart, signInSucess } from '../redux/user/userSlice';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import OAuth from '../components/OAuth';
function Signin() {
  const dispatch = useDispatch()
  const {loading , error } = useSelector(state => state.user)
  const [password , setPassword] = useState('')
  const [email, setEmail] = useState('')
  const navigate = useNavigate()
  const signUp = (e)=>{
    e.preventDefault()
    dispatch(signInStart)
    if (!password || !email) {
      return dispatch(signInFailure('please fill all the information '))
    }
    axios.post('http://localhost:3000/api/signin', { password, email })
    .then((result) => {
      dispatch(signInSucess(result.data))
    })
    .catch((err) => {
      dispatch(signInFailure("verify your password or email adresss"))
    });
  }
  return (
    <div className='flex justify-center mx-auto '>
      <div className='flex items-center justify-center space-x-5 my-20 mx-10 max-sm:flex-col max-sm:space-y-4'>
        <div className='w-2/3 max-sm:w-full max-sm:mx-auto'>
          <div className='self-center whitespace-nowrap text-3xl  tracking-wide font-semibold dark:text-white'>
            <span className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Blog</span>Blog</div>
          <div className='text-gray-800 my-2'>
            you can sign up with your username and password or your google account
          </div>
        </div>
        <Card className="w-2/3 max-sm:w-full max-sm:mx-auto ">
          <form className="flex flex-col gap-4" >
            <div>
              <div className="mb-2 block">
                <Label value="Your email" />
              </div>
              <TextInput type="email" value={email} placeholder="name@domain.com" onChange={(e)=>setEmail(e.target.value)} required />
            </div>
            <div>
              <div className="mb-2 block">
                <Label value="Your password" />
              </div>
              <TextInput type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
            </div>
            <Button type="submit" disabled={loading} gradientDuoTone="purpleToBlue" onClick={(e)=>{signUp(e)}}>{loading ? <><Spinner size="sm"/> <span>Loading...</span></> : "Sign Up"}</Button>
            <OAuth/>
          </form>
          <div className='text-gray-400 text-sm'>dont have an account ?<Link to={'/signup'} className='text-blue-500'> Sign Up</Link></div>
          {
          error && <Alert className='my-3' color="failure">{error}</Alert>
        }
        </Card>
      </div>
    </div>

  )
}
export default Signin