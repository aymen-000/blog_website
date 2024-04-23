import axios from 'axios'
import { Button } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import OneComment from './OneComment'

function Commontaires({ postId }) {
  const [numOfComments , setNumComments] = useState(0)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState(null)
  const [comments, setComments] = useState([])
  const [show, setShow] = useState(true)
  const getTime = (timeAndDate) => {
    const date = new Date(timeAndDate)
    const time = date.toISOString().split('T')[1].split(':')
    return time[0]+':'+time[1]
  }
  useEffect(() => {
    setLoading(true);
    const url = `http://localhost:3000/api/getComments?startIndex=0&endIndex=2&postId=${postId}`;

    axios.get(url)
      .then((result) => {
        setComments(result.data?.allComments);
        setLoading(false);
        setNumComments(result.data.numOfComments)
      })
      .catch((err) => {
        setLoading(false);
        setErr('Oops... something happened');
      });
  }, []);
  const showMore = (e) => {
    e.preventDefault()
    setLoading(true)
    const startIndex = comments.length
    const url = `http://localhost:3000/api/getComments?startIndex=${startIndex}&postId=${postId}`;
    axios.get(url).then((result) => {
      setComments((prev) => [...prev, ...result.data?.allComments])
      setLoading(false)
      if ([...comments, ...result.data.allComments].length == result.data.numOfComments) {
        setShow(false)
      }


    }).catch((err) => {
      setLoading(false)
      setErr(err.message)
    })
  }

  return (
    <div class="antialiased  mx-auto w-2/3 space-y-3 text-justify">
      <div className='flex space-x-2 items-center'>
      <h3 class="text-lg font-semibold text-black-900 ">Comments</h3>
      <div className='border border-gray-400 rounded px-2 w-fit  '>{numOfComments}</div>
      </div>
      
      {comments.map((comment)=>{
        {console.log(comment.numberOfLikes)}
        return <OneComment id={comment._id} userId={comment.userId} numLikes={comment.numberOfLikes} Likes={comment.likes} comment={comment.content} postId={postId} time={getTime(comment.updatedAt)}/>
      })}
      {show && <div onClick={(e)=>showMore(e)} className='text-gray-500 text-center hover:underline cursor-pointer'> show more </div>}
    </div>

  )
}

export default Commontaires