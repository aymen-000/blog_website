import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { Alert, Button, FileInput, Label, Select, Spinner, TextInput } from 'flowbite-react'
import ReactQuill from 'react-quill';
import { useParams } from 'react-router-dom'
import { app } from '../firebaseConfig/firebase';
import { useNavigate } from 'react-router-dom';
function UpdatePost() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [imgPreUrl, setImgPreUrl] = useState(null)
    const [file, setFile] = useState(null)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [category, setCategory] = useState(null)
    const [uploadErr, setUploadErr] = useState(null)
    const [dataProgress, setDataProgress] = useState(0)
    const [imgUrl, setImgUrl] = useState(null)
    const [err , setErr] = useState(null)
    useEffect(() => {
        axios.get('http://localhost:3000/api/getOnePost/' + id).then(
            (result) => {
                setImgPreUrl(result.data?.image)
                setTitle(result.data?.title)
                setCategory(result.data?.category)
                setContent(result.data?.content)
            }
        ).catch((err) => {
            setDriver(err.message)
        })
    }, [])
    const UpdateBlog = (e) => {
        e.preventDefault() 
        const data = {
            title : title , 
            category : category , 
            image : imgPreUrl ,
            content : content 
        }
        axios.post('http://localhost:3000/api/updatePost/'+id , data).then(
            (result)=>{
                setErr(null)
                navigate('/dashboard?tab=posts')
            }
        ).catch((err)=>{
            setErr('something happened')
            console.log(err.message)
        })
    }
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
                        setImgPreUrl(result)
                        console.log(imgPreUrl)

                    })
                }
            }
        )
    }
    return (
        <div >
            <h1 className='text-center text-2xl font-bold text-black my-2 '>Update a post</h1>
            <div>
                <TextInput placeholder='Title' className='p-2' value={title} onChange={(e) => { setTitle(e.target.value) }} />
            </div>
            <form onSubmit={(e) => { UpdateBlog(e) }}>
                <div className='p-2 my-2'>
                    <Select id='categories' onChange={(e) => setCategory(e.target.value)} required>
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
                    imgUrl == null || imgPreUrl == null && <Alert className='mx-2'>Please Select an image</Alert>
                }
                {
                    dataProgress != 0 && dataProgress < 100 ? <Spinner className='flex justify-center my-2' /> : <div className='mx-4'> </div>

                }
                <div> <img src={imgPreUrl} className='w-full px-6   h-80' /></div>
                <div className='my-4 mx-2 min-h-[200px] '>
                    <ReactQuill value={content} theme="snow" style={{ height: '150px' }} onChange={(value) => setContent(value)}></ReactQuill>
                </div>
                <div>
                    <Button gradientDuoTone="purpleToPink" className='w-2/3 mx-auto ' type='submit'>UPDATE</Button>
                </div>
                {
                    err && <Alert className='my-2 w-2/3 mx-auto' color="failure" >{err}</Alert>
                }

            </form>
        </div>
    )
}

export default UpdatePost