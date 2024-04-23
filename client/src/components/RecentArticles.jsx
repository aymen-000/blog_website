import axios from 'axios'
import React, { useEffect, useState } from 'react'
import MySpinner from './MySpinner'
import PostCard from './PostCard'
function RecentArticles({postId}) {
    const [recent , setRecent] = useState([])
    const [loading , setLoading] = useState(false)
    const [err , setErr]= useState(null)
    useEffect(()=>{
        setLoading(true)
        axios.get('http://localhost:3000/api/getPosts?limit=3&sort=asc').then((result)=>{
            setRecent(result.data.posts.filter((item)=>item._id != postId))
            setLoading(false)
        }).catch((err)=>{
            console.log(err.message)
            setLoading(false)
        })
    } , [])
  return (
    <>
        {
            loading ? <div className='h-[100vh] items-center justify-center flex'><MySpinner/></div> : <div className=' grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-8 my-5  '>
                {
                    recent.length>0 && recent.map((post)=>{
                        return <PostCard postTitle={post.title} postImg={post.image} postId={post._id}/>
                    })
                }
            </div>
        }
    </>
  )
}

export default RecentArticles