import axios from 'axios'
import { Button, Table } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Modal } from 'flowbite-react'
import { HiOutlineExclamationCircle } from 'react-icons/hi';
function Posts() {
    const [posts, SetPosts] = useState([])
    const [err, setErr] = useState(null)
    const [shoMore, setShowMore] = useState(true)
    const [showModal, setShowModal] = useState(false)
    useEffect(() => {
        axios.get('http://localhost:3000/api/getPosts').then((result) => {
            SetPosts(result.data?.posts)
            if (result.data?.posts.length < 2) {
                setShowMore(false)
            }
        }).catch((err) => {
            setDriver("oops!! something happened")
        })
    }, [posts])
    const DeletePost = (e, id) => {
        e.preventDefault()
        axios.post('http://localhost:3000/api/deletePost', { id }).then((result) => {
            if (result.data == "ok") {
                console.log("ok")
            }
        }).catch((err) => {
            console.log(err)
            setErr(err)
        })
    }
    const UpdatePost = (e) => {
        e.preventDeafult()
    }
    const showMorePosts = (e) => {
        e.preventDefault()
        const startIndex = posts.length
        axios.get('http://localhost:3000/api/getPosts?startIndex=' + startIndex).then((result) => {
            SetPosts((prev) => ([...prev, ...result.data?.posts]))
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
                            <Table.Cell ><Link to={"/posts/" + post._id} className='hover:underline'>{post.title}</Link></Table.Cell>
                            <Table.Cell>{post.category}</Table.Cell>
                            <Table.Cell><div className='text-red-600 cursor-pointer hover:underline' onClick={(e) => { setShowModal(true) }}>Delete</div></Table.Cell>
                            <Modal show={showModal} size="md" onClose={() => setShowModal(false)} popup>
                                <Modal.Body>
                                    <div className='text-center'>
                                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200">

                                        </HiOutlineExclamationCircle>
                                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                            Are you sure you want to delete this post?
                                        </h3>
                                        <div className="flex justify-center gap-4">
                                            <Button color="failure" onClick={() => { setShowModal(false); DeletePost(post._id, e) }}>
                                                {"Yes, I'm sure"}
                                            </Button>
                                            <Button color="gray" onClick={() => setShowModal(false)}>
                                                No, cancel
                                            </Button>
                                        </div>
                                    </div>
                                </Modal.Body>
                            </Modal>
                            <Table.Cell><div className='text-green-600 cursor-pointer hover:underline' ><Link to={'/dashboard/posts/update/'+post._id}>Update</Link></div></Table.Cell>
                        </Table.Row>)

                    })
                    }
                </Table.Body>
            </Table>
            {

                shoMore && <div className='text-center flex justify-center my-3'>
                    <Button onClick={(e) => { showMorePosts(e) }}>Show more posts </Button>
                </div>
            }

        </div>
    )
}

export default Posts