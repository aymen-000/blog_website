import axios from 'axios'
import { Button } from 'flowbite-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import userSlice, { signInSucess } from '../redux/user/userSlice'
import { Link, useNavigate } from 'react-router-dom'
import { toggleAlert } from '../redux/alert/alertSlice'
function DeleteAlert() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {show} = useSelector((state)=>state.alert)
    const {currentUser} = useSelector((state)=>state.user)
    const DeleteAcount = (e)=>{
        e.preventDefault()
        axios.post('http://localhost:3000/delete' , {id : currentUser?.userWihthoutPassword?.id}).then((result)=>{
            console.log('deleted')
            dispatch(signInSucess(null))
        }).catch((err)=>{
            console.log('error')
            console.log(err.message)
        })
    }
    return (
        <>
            <div className="mb-4 mt-2 text-sm text-cyan-700 dark:text-cyan-800">
                Do you want to Delete the account , You won't be able to acess to it again 
            </div>
            <div className='flex space-x-2'>
                <Button gradientMonochrome="failure" onClick={(e)=>{DeleteAcount(e)}}>Yes,Delete</Button>
                <Button gradientMonochrome="success" onClick={(e)=>{dispatch(toggleAlert(false))}} >No, Dismiss</Button>
            </div>
        </>
    )
}

export default DeleteAlert