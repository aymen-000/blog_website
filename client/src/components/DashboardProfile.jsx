import { TextInput, Label, Button, Alert } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebaseConfig/firebase'
import axios from "axios"
import { signInSucess, updateInformations } from '../redux/user/userSlice'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import Cookies from 'cookies'
function DashboardProfile() {
    const dispatch = useDispatch()
    const { currentUser } = useSelector((state) => state.user)
    const [newUserName, setNewUserName] = useState(currentUser?.userWihthoutPassword?.username)
    const [email, setEmail] = useState(currentUser?.userWihthoutPassword?.email)
    const [imageFile, setImageFile] = useState(null)
    const [tempImageUrl, setTempImageUrl] = useState(null)
    const [dataProgress, setDataProgress] = useState(0)
    const [imageFileUploadERR, setImageFileUplaodERR] = useState(null)
    const [password, setPassword] = useState('')
    const uploadFile = (e) => {
        e.preventDefault()
        const file = e.target.files[0]
        setImageFile(file)
        setTempImageUrl(URL.createObjectURL(file))
        upadateImage()
    }
    const upadateImage = () => {
        const storage = getStorage(app)
        const filename = new Date().getTime() + imageFile?.name
        const storageRef = ref(storage, filename)
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                setDataProgress(progress.toFixed(0))
            },
            (error) => {

                setImageFileUplaodERR('Could not upload image check it is size')
            },
            () => {
                if (imageFileUploadERR == null) {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setTempImageUrl(downloadURL)
                    })
                } else {
                    setTempImageUrl(currentUser.userWihthoutPassword.photoURL)
                }
            }
        )
    }
    useEffect(() => {
        if (imageFile) {
            upadateImage()
            console.log('temp image url :')
            console.log(tempImageUrl)
        }
    }, [imageFile])
    const updateInformation = (e) => {
        e.preventDefault()
        const id = currentUser?.userWihthoutPassword?.id
        axios.post('http://localhost:3000/api/updateInformation', { password, newUserName, email, tempImageUrl, id }).then((result) => {
            if (result.data == "updated sucessfuly") {
                const userWihthoutPassword = {
                    username: newUserName,
                    email: email,
                    photoURL: tempImageUrl,
                }
                console.log(userWihthoutPassword)
                dispatch(signInSucess({ userWihthoutPassword }))
                console.log('done')
            }
        }).catch((err) => {
            console.log("error")
            console.log(err.message)
        })
    }
    const deleteAcount = (e) => {
        e.preventDefault()
        console.log('deleted')
    }
    const signOut = (e) => {
        e.preventDefault()
        axios.get('http://localhost:3000/api/logout').then((result)=>{
            console.log(result.data)
        }).catch((err)=>{
            console.log('err')
            console.log(err.message)
        })
    }
    return (
        <div className=' w-5/6 flex justify-center justify-items-center mt-20 mb-20 max-sm:w-full mx-auto px-5' >
            <div className='flex-col justify-center w-1/3 max-sm:w-full max-lg:w-2/3  '>
                <h1 className='font-bold font-xl items-center text-center my-2'>Profile</h1>
                <div className='relative flex justify-center'>
                    <label>
                        <input type='file' className='hidden' onChange={(e) => { uploadFile(e) }} />
                        <img src={tempImageUrl || currentUser?.userWihthoutPassword?.photoURL} className='w-16 h-16 rounded-full  border-4 border-gray-500 ' />
                    </label>
                </div>
                {console.log('err:', imageFileUploadERR)}
                {imageFileUploadERR && <div className='my-2'> <Alert color="failure">{imageFileUploadERR}</Alert></div>}
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
                        <div className='text-red-700  cursor-pointer hover:text-red-600' onClick={(e) => { deleteAcount(e) }} >Delete Account</div>
                        <div className='text-red-700 cursor-pointer hover:text-red-600' onClick={(e) => { signOut(e) }}>Sign out</div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DashboardProfile