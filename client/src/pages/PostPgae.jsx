import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import MySpinner from '../components/MySpinner'
import Commontaire from '../components/Commontaire'
import { useSelector } from 'react-redux'
import Commontaires from '../components/Commontaires'
function PostPgae() {
  const {currentUser} = useSelector((state)=>state.user)
  const { id } = useParams()
  const [err, setErr] = useState(null)
  const [loading, setloading] = useState(false)
  const [post, setPost] = useState()
  const [postImg, setPostImg] = useState(null)
  const [postTitle, setPostTitle] = useState()
  const [updated, setUpdated] = useState(null)
  const [readTime , setReadTime] = useState(0)

  useEffect(() => {
    setloading(true)
    axios.get('http://localhost:3000/api/getPosts?postId=' + id).then((result) => {
      
      const timestamp = result.data.posts[0].updatedAt
      const date = new Date(timestamp)
      const formatedDate = date.toISOString().split('T')[0]
      setReadTime((result.data.posts[0].content.length /1000).toFixed(0))
      setPostImg(result.data?.posts[0].image)
      setUpdated(formatedDate)
      setPostTitle(result.data?.posts[0].title)
      setPost(result.data?.posts[0].content)
      setloading(false)
    }).catch((err) => {
      setloading(false)
      setErr('something happend...!')
      console.log(err.message)
    })
  }, [id])

  return (
    <>
      {
        loading ? <div className='h-[100vh] justify-center flex items-center'><MySpinner /></div> : <div className='mx-auto py-5 text-justify'>
          <h1 className="text-3xl font-serif  text-center mt-3 mb-7 font-bold">{postTitle}</h1>
          <div className='sm:w-2/3 text-center mx-auto p-6'>
            <img src={postImg} className={'w-full h-[355px] '} />
            <div className='flex justify-between my-2'>
              <div className='text-gray-500'>{updated}</div>
              <div className='text-gray-500'>{readTime} mins read </div>
              
            </div>
            <hr className="my-8 border-t-2 border-gray-500  text-center" />
          </div>
          
          <div className='py-2 mx-4 post_content' dangerouslySetInnerHTML={{ __html: post }} ></div>
          <div className='flex items-center justify-center'>Signed in as :
           <div className='mx-2'><img src={currentUser?.userWihthoutPassword?.photoURL} className='rounded-full w-6 h-6'/> </div><div className='text-blue-300'>{currentUser?.userWihthoutPassword?.email}</div></div>
          <div className='flex justify-center'>
            
            <Commontaire postId={id}/>

          </div>
          <div>
            <Commontaires postId={id}/>
          </div>
        </div>
      }

    </>



  )
}

export default PostPgae