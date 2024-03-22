import axios from 'axios';
import { Alert, Spinner, Table, TableBody, TableHead } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { Button } from 'flowbite-react';
import MySpinner from '../components/MySpinner'
import Search from '../components/Search';
import { Modal } from 'flowbite-react'
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
function Users() {
    const [users, setUsers] = useState([]);
    const [err, setErr] = useState(null);
    const [showMore, setShowMore] = useState(false)
    const [load, setLoad] = useState(false)
    const [load2, setLoad2] = useState(false)
    const [search, setSearch] = useState('')
    const [clicked, setClicked] = useState(false)
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState([]);

    // Function to toggle modal for a specific user
    const toggleModal = (index) => {
        const newShowModal = [...showModal];
        newShowModal[index] = !newShowModal[index];
        setShowModal(newShowModal);
    };
    useEffect(() => {
        setLoad(true)
        axios.get('http://localhost:3000/api/getUsers')
            .then((result) => {
                console.log('reeee')
                const m = [...result.data.usersWithoutPasswords]
                setUsers(m);
                setLoad(false)
                if (m.length >= 2) {
                    setShowMore(true)
                } else {
                    setShowMore(false)
                }
                setErr(null);
            })
            .catch((err) => {
                console.error(err);
                setLoad(false)
                setErr("Oops something happened !!");
            });
    }, [clicked]);
    const showMorePosts = (e) => {
        e.preventDefault();
        setLoad2(true)
        const startIndex = users.length; // Assuming users is your current state containing user data
        console.log(startIndex)
        axios.get('http://localhost:3000/api/getUsers?startIndex=' + startIndex)
            .then((result) => {
                const m = [...result.data.usersWithoutPasswords]
                if (m.length > 0) { // Check if there are new posts
                    setUsers((prev) => [...prev, ...m]); // Concatenate new posts with previous posts
                    if (m.length === 2) { // Check if the number of new posts is exactly 2
                        setShowMore(true); // If there are exactly 2 new posts, show the "Show More" button
                    } else {
                        setShowMore(false); // Otherwise, hide the "Show More" button
                    }
                    setErr(null);
                } else {
                    setShowMore(false); // If no new posts are returned, hide the "Show More" button
                }
                setLoad2(false)
            }).catch((err) => {
                console.error(err);
                setLoad2(false)
                setErr("Oops something happened !!");
            });
    };
    useEffect(() => {
        axios.get('http://localhost:3000/api/getUsers?search=' + search)
            .then((result) => {
                const m = [...result.data.usersWithoutPasswords]
                setUsers(m );
                setLoad(false)
                if (m.length >= 2) {
                    setShowMore(true)
                } else {
                    setShowMore(false)
                }
                setErr(null);
            })
            .catch((err) => {
                console.error(err);
                setLoad(false)
                setErr("Oops something happened !!");
            });
    }, [search])
    const DeleteUser = (id, e) => {
        e.preventDefault()
        axios.delete('http://localhost:3000/api/deleteUser/' + id).then(
            (result) => {
                if (result.data == 'ok') {
                    setErr(null)
                    navigate('/dashboard?tab=users')
                    setClicked(true)
                } 
            }
        ).catch((err) => {
            setErr("Ooops something happend")
        })
    }
    return (

        <div className='min-h-[100vh] w-full my-2 mx-2'>
            {err ? (
                <Alert className='my-2 w-2/3 mx-auto' color="failure">{err}</Alert>
            ) : load ? <MySpinner /> : (
                <>
                    <form className="max-w-md mx-auto my-6">
                        <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search username,email..." required />
                            <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                        </div>
                    </form>
                    <Table className="overflow-x-auto" hoverable>
                        <TableHead>
                            <Table.HeadCell>DATE JOIN</Table.HeadCell>
                            <Table.HeadCell>USER IMAGE</Table.HeadCell>
                            <Table.HeadCell>USERNAME</Table.HeadCell>
                            <Table.HeadCell>EMAIL</Table.HeadCell>
                            <Table.HeadCell>ADMIN</Table.HeadCell>
                            <Table.HeadCell>DELETE</Table.HeadCell>
                        </TableHead>
                        <TableBody>
                            {/* Iterate over users and render table rows */}
                            {console.log(users)}
                            {
                                
                                users?.map((user, index) => (
                                    <Table.Row key={user.id}>
                                        <Table.Cell>{user.createdAt.toString().split('T')[0]}</Table.Cell>
                                        <Table.Cell>
                                            <img src={user.photoURL} alt={user.username} className='rounded-full  w-12 h-12' />
                                        </Table.Cell>
                                        <Table.Cell>{user.username}</Table.Cell>
                                        <Table.Cell>{user.email}</Table.Cell>
                                        <Table.Cell className={user.isAdmin ? 'text-green-600' : 'text-red-500'}>
                                            {user.isAdmin ? 'Yes' : 'No'}
                                        </Table.Cell>
                                        <Table.Cell className='text-red-500 cursor-pointer' onClick={() => toggleModal(index)}>
                                            Delete
                                        </Table.Cell>
                                        {/* Modal for each user */}
                                        {showModal[index] && (
                                            <Modal key={user.id} show={showModal[index]} size="md" onClose={() => toggleModal(index)} popup>
                                                <Modal.Body>
                                                    <div className='text-center'>
                                                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                                                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                                            Are you sure you want to delete this user?
                                                        </h3>
                                                        <div className="flex justify-center gap-4">
                                                            <Button color="failure" onClick={(e) => { toggleModal(index); DeleteUser(user._id,e) }}>
                                                                {"Yes, I'm sure"}
                                                            </Button>
                                                            <Button color="gray" onClick={() => toggleModal(index)}>
                                                                No, cancel
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </Modal.Body>
                                            </Modal>
                                        )}
                                    </Table.Row>
                                ))
                            }                       
                         </TableBody>
                    </Table>
                </>
            )}
            {!err && showMore && <div className='text-center flex justify-center my-3'>
                <Button onClick={(e) => { showMorePosts(e) }}>{load2 && <Spinner aria-label="Spinner button example" size="sm" className='mx-2' />}Show more posts </Button>
            </div>}
        </div>
    );
}

export default Users;