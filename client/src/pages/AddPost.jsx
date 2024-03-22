import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { Alert, Button, FileInput, Label, Select, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { app } from '../firebaseConfig/firebase';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { HiInformationCircle } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
function AddPost() {
    const navigate = useNavigate()
    const {currentUser} = useSelector(state =>state.user  )
    const [file, setFile] = useState(null)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [category, setCategory] = useState(null)
    const [uploadErr, setUploadErr] = useState(null)
    const [dataProgress, setDataProgress] = useState(0)
    const [imgUrl, setImgUrl] = useState(null)
    const [err , setErr] = useState(null)
    const uploadImage = (e) => {
        e.preventDefault()
        const storage = getStorage(app)
        const filename = new Date().getTime() + file?.name
        const storageref = ref(storage, filename)
        const uploadTask = uploadBytesResumable(storageref, file)
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                setDataProgress(progress.toFixed(0))
            },
            (error) => {
                setUploadErr(error)
            },
            () => {
                if (uploadErr == null) {
                    getDownloadURL(uploadTask.snapshot.ref).then((result) => {
                        setImgUrl(result)

                    })
                }
            }
        )
    }
    const postBlog = (e)=>{
        e.preventDefault()
        const data = {
            category , 
            title , 
            content , 
            image :imgUrl  , 
            userId : currentUser?.userWihthoutPassword?.id
        }
        axios.post('http://localhost:3000/api/create' , data).then((result)=>{
            navigate('/dashboard?tab=posts')
        }).catch((err)=>{
            setErr("Check your inforamtion")
        })
    }
    return (
        <div >
            <h1 className='text-center text-2xl font-bold text-black my-2 '>Create a post</h1>
            <div>
                <TextInput placeholder='Title' className='p-2' onChange={(e) => { setTitle(e.target.value) }} />
            </div>
            <form onSubmit={(e) => { postBlog(e) }}>
                <div className='p-2 my-2'>
                    <Select id='categories' value={category}  onChange={(e) => setCategory(e.target.value)} required>
                        <option>Science</option>
                        <option>Travel</option>
                        <option>Cooking</option>
                    </Select>
                    <div className='my-3 flex space-x-3 w-full' >
                        <div>
                            <div>
                                <Label htmlFor='file-upload' />
                            </div>
                            <FileInput id="file-upload" accept='image/*' onChange={(e) => setFile(e.target.files[0])} />
                        </div>
                        <div className=''>
                            <Button outline gradientDuoTone="purpleToBlue" onClick={(e) => { uploadImage(e) }}>
                                upload
                            </Button>
                        </div>
                    </div>
                </div>
                {
                    imgUrl == null && <Alert className='mx-2'>Please Select an image</Alert>
                }
                {
                    dataProgress != 0 && dataProgress < 100 ? <Spinner className='flex justify-center my-2' /> : <div className='mx-4'><img className='w-full max-h-[500px] ' src={imgUrl} /> </div>
                }
                <div className='my-4 mx-2 min-h-[200px] '>
                    <ReactQuill theme="snow" style={{ height: '150px' }} onChange={(value) => setContent(value)}></ReactQuill>
                </div>
                <div>
                    <Button gradientDuoTone="purpleToPink" className='w-2/3 mx-auto ' type='submit'>Publish</Button>
                </div>
                {
                    err && <Alert className='my-2 w-2/3 mx-auto' color="failure" icon={HiInformationCircle}>{err}</Alert>
                }
                
            </form>
        </div>
    )
}

export default AddPost