import React, { useState } from 'react'
import { Button, Label, Textarea } from "flowbite-react";
import axios from 'axios';
import { useSelector } from 'react-redux';
function Commontaire({postId}) {
    const {currentUser} = useSelector((state)=>state.user)
    const [chrNum , setChrNum] = useState(200)
    const [content, setContent] = useState("")
    const Submit = (e)=>{
        e.preventDefault()
        axios.post("http://localhost:3000/api/addComment"  , {content , postId , userId :currentUser.userWihthoutPassword?.id}).then((result)=>{
            console.log(result.data)
        }).catch((err)=>{
            console.log("error")
            console.log(err.message)
        })

    }
    return (
        
        <div className='border border-gray-300 rounded-lg text-center p-4 w-4/5 my-3 '>
            <div className="mb-2 block">
                <Label htmlFor="comment" value="Your message" />
            </div>
            <Textarea id="comment" placeholder="Leave a comment..." required rows={4} value={content} onChange={(e)=>{setContent(e.target.value) ; setChrNum(200 - e.target.value.length)}} />
            <div className='flex justify-between my-3 max-sm:flex-col  max-sm:items-center max-sm:space-y-2'>
                <div  className='text-slate-400 '>{chrNum} characters remaining  </div>
                <div><Button outline onClick={(e)=>{Submit(e)}}>Submit</Button></div>
            </div>
        </div>
    )
}

export default Commontaire