import { Button, FileInput, Label, Select, TextInput } from 'flowbite-react'
import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
function AddPost() {
    return (
        <div >
            <h1 className='text-center text-2xl font-bold text-black my-2 '>Create a post</h1>
            <div>
                <TextInput placeholder='Title' className='p-2' />
            </div>
            <div className='p-2 my-2'>
                <Select id='categories' required>
                    <option>Science</option>
                    <option>Travel</option>
                    <option>Cooking</option>
                </Select>
                <div className='my-3 flex space-x-3 w-full' >
                    <div>
                        <div>
                            <Label htmlFor='file-upload' />
                        </div>
                        <FileInput id="file-upload" />
                    </div>
                    <div className=''>
                        <Button outline gradientDuoTone="purpleToBlue">
                            upload
                        </Button>
                    </div>
                </div>
            </div>
            <div className='my-4 mx-2 min-h-[200px] '>
                <ReactQuill theme="snow" style={{ height: '150px' }} ></ReactQuill>
            </div>
            <div>
                <Button gradientDuoTone="purpleToPink" className='w-2/3 mx-auto '>Publish</Button>
            </div>
        </div>
    )
}

export default AddPost