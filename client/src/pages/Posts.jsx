import axios from 'axios'
import { Button, Table } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
function Posts() {
    const [posts, SetPosts] = useState([])
    const [err, setErr] = useState(null)
    const [shoMore , setShowMore] = useState(true)
    useEffect(() => {
        axios.get('http://localhost:3000/api/getPosts').then((result) => {
            SetPosts(result.data?.posts)
            if (result.data?.posts.length < 2) {
                setShowMore(false)
            }
        }).catch((err) => {
            setDriver("oops!! something happened")
        })
    }, [])
    const DeletePost = (e) => {
        e.preventDeafult()
    }
    const UpdatePost = (e) => {
        e.preventDeafult()
    }
    const showMorePosts = (e)=>{
        e.preventDefault()
        console.log('clciked')
        const startIndex = posts.length 
        axios.get('http://localhost:3000/api/getPosts?startIndex='+startIndex).then((result) => {
            SetPosts((prev)=>([...prev , ...result.data?.posts]))
            console.log(result.data?.posts.length)
            if (result.data?.posts.length < 2) {
                setShowMore(false)
            }
        }).catch((err) => {
            setErr("oops!! something happened")
        })

    }
    return (
        <div className='overflow-x-auto w-full my-4 mx-4 min-h-[100vh] '>
            <Table hoverable >
                <Table.Head>
                    <Table.HeadCell>DATE UPDATE</Table.HeadCell>
                    <Table.HeadCell>POST IMAGE</Table.HeadCell>
                    <Table.HeadCell>POST TITLE</Table.HeadCell>
                    <Table.HeadCell>CATEGORY</Table.HeadCell>
                    <Table.HeadCell>DELETE</Table.HeadCell>
                    <Table.HeadCell>EDIT</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {posts.map((post) => {
                        
                        return (<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer" >
                            <Table.Cell>{post.updatedAt}</Table.Cell>
                            <Table.Cell>
                                <img src={post.image} width={80} height={80} />
                            </Table.Cell>
                            <Table.Cell ><Link to={"/dashboard/posts/"+post._id} className='hover:underline'>{post.title}</Link></Table.Cell>
                            <Table.Cell>{post.category}</Table.Cell>
                            <Table.Cell><div className='text-red-600 cursor-pointer hover:underline' onClick={(e) => { DeletePost(e) }}>Delete</div></Table.Cell>
                            <Table.Cell><div className='text-green-600 cursor-pointer hover:underline' onClick={(e) => { UpdatePost(e) }}>Update</div></Table.Cell>
                        </Table.Row>)

                    })
                    }
                </Table.Body>
            </Table>
            {
                shoMore && <div className='text-center flex justify-center my-3'>
                    <Button onClick={(e)=>{showMorePosts(e)}}>Show more posts </Button>
                </div>
            }
        </div>
    )
}

export default Posts