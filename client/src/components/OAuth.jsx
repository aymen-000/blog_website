import { Button } from 'flowbite-react'
import React from 'react'
import { FaGoogle } from "react-icons/fa";
import 'firebase/auth';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebaseConfig/firebase';
import axios from 'axios';
import { signInFailure , signInStart , signInSucess } from '../redux/user/userSlice';
import {  useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function OAuth() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {currentUser} = useSelector((state)=>state.user)
    const SignInWithGoogle = async (e)=>{
        const auth = getAuth(app)
        const Provider = new GoogleAuthProvider()
        Provider.setCustomParameters({prompt : "select_account"})
        try {
            const resultFromGoogle = await signInWithPopup(auth , Provider)
            const username = resultFromGoogle?.user?.displayName 
            const email = resultFromGoogle?.user?.email 
            const photoUrl = resultFromGoogle?.user?.photoURL
            console.log(username , email , photoUrl)
            axios.post('http://localhost:3000/api/google' , {username , email , photoUrl}).then(
                (result)=>{
                    console.log(result.data)
                    dispatch(signInSucess(result.data))
                    navigate('/')
                }
            ).catch((err)=>{dispatch(signInFailure('somthing happend'))})
        }catch(err) {
            console.log('err')
            console.log(err.message)
        }
    }
  return (
        <Button type='button' gradientDuoTone={"pinkToOrange"} outline onClick={(e)=>SignInWithGoogle(e)}>
            <FaGoogle className='mx-2'/> Continue with Google
        </Button>
  )
}

export default OAuth