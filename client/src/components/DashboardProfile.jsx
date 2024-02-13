import { TextInput, Label, Button } from 'flowbite-react'
import { set } from 'mongoose'
import React, { useEffect, useState } from 'react'
import { FaUser } from "react-icons/fa"
import { FaSignOutAlt } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebaseConfig/firebase'
function DashboardProfile() {
    const { currentUser } = useSelector((state) => state.user)
    const [newUserName, setNewUserName] = useState(currentUser.userWihthoutPassword.username)
    const [email, setEmail] = useState(currentUser.userWihthoutPassword.email)
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
        console.log(imageFile)
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
            (err) => {
                setImageFileUplaodERR('Could not upload image check it is size')
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setTempImageUrl(downloadURL)
                })
            }
        )
    }
    useEffect(() => {
        if(imageFile){
            upadateImage()
        }
    }, [imageFile])
    console.log('data :::: ')
    console.log(imageFileUploadERR, dataProgress, tempImageUrl)
    return (
        <div className=' w-5/6 flex justify-center justify-items-center mt-20 mb-20 max-sm:w-full mx-auto px-5' >
            <div className='flex-col justify-center w-1/3 max-sm:w-full max-lg:w-2/3  '>
                <h1 className='font-bold font-xl items-center text-center my-2'>Profile</h1>
                <div className='flex justify-center'>
                    <label>
                        <input type='file' className='hidden' onChange={(e) => { uploadFile(e) }} />
                        <img src={tempImageUrl || currentUser.userWihthoutPassword.photoURL} className='w-16 h-16 rounded-full  border-4 border-gray-500 ' />
                    </label>
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