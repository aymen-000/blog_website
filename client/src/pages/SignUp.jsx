import { Card, TextInput, Label, Button, Alert, Spinner } from 'flowbite-react'
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';


function SignUp() {
  const [username , setUsername] = useState('')
  const [password , setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [err , setErr] = useState(null)
  const [loading , setLoading] = useState(false)
  const navigate = useNavigate()
  const signUp = (e)=>{
    e.preventDefault()
    setLoading(true)
    if (!username || !password || !email) {
      setLoading(false)
      return setErr('please fill all the information ')
    }
    axios.post('http://localhost:3000/api/signup', { username, password, email })
    .then((result) => {
      setLoading(false)
      if (result.data == 'signup sucess'){
        navigate('/signIn')
      }
    })
    .catch((err) => {
      setLoading(false)
      console.log(err.message);
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
                <Label htmlFor="text" value="Your username" />
              </div>
              <TextInput type="text" value={username} onChange={(e)=>setUsername(e.target.value)} required />
            </div>
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
          </form>
          <div className='text-gray-400 text-sm'>Have an account ?<Link to={'/signIn'} className='text-blue-500'> Sign In</Link></div>
          {
          err && <Alert className='my-3' color="failure">{err}</Alert>
        }
        </Card>
      </div>
    </div>

  )
}

export default SignUp