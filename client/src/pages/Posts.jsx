import axios from 'axios'
import { Table } from 'flowbite-react'
import React, { useState } from 'react'

function Posts() {
    const [posts , SetPosts] = useState([])
    const [err , setErr] = useState(null)
    axios.get('http://localhost:3000/api/getPosts').then((result)=>{
        SetPosts(result.data)
    }).catch((err)=>{
        setDriver("oops!! something happened")
    })
    const DeletePost = (e)=>{
        e.preventDeafult()
    }
    const UpdatePost = (e)=>{
        e.preventDeafult()
    }
  return (
    <div className='overflow-x-auto w-full my-2 mx-2 min-h-[100vh]'>
        <Table striped>
            <Table.Head>
                <Table.HeadCell>DATE UPDATE</Table.HeadCell>
                <Table.HeadCell>POST IMAGE</Table.HeadCell>
                <Table.HeadCell>POST TITLE</Table.HeadCell>
                <Table.HeadCell>CATEGORY</Table.HeadCell>
                <Table.HeadCell>DELETE</Table.HeadCell>
                <Table.HeadCell>EDIT</Table.HeadCell>
            </Table.Head>
            <Table.Body>
            {
                posts.map((post)=>{
                    return (
                        <Table.Row>
                            <Table.Cell>{post.updatedAt}</Table.Cell>
                            <Table.call>
                                <img src={post.image} width={100} height={100}/>
                            </Table.call>
                            <Table.Cell>{post.title}</Table.Cell>
                            <Table.Cell>{post.category}</Table.Cell>
                            <Table.call><div className='text-red-600 cursor-pointer' onClick={(e)=>{DeletePost(e)}}>Delete</div></Table.call>
                            <Table.call><div className='text-green-600 cursor-pointer' onClick={(e)=>{UpdatePost(e)}}>Update</div></Table.call>
                        </Table.Row>
                    )
                })
            }
            </Table.Body>
        </Table>
    </div>
  )
}

export default Posts