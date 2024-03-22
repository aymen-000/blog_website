import axios from 'axios';
import { Alert, Table, TableBody, TableHead } from 'flowbite-react';
import React, { useEffect, useState } from 'react';

function Users() {
    const [users, setUsers] = useState([]);
    const [err, setErr] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3000/api/getUsers')
            .then((result) => {
                setUsers(result.data);
                setErr(null);
            })
            .catch((err) => {
                console.error(err);
                setErr("Oops something happened !!");
            });
    }, []);

    return (
        <div className='min-h-[100vh] w-full my-2 mx-2'>
            {err ? (
                <Alert className='my-2 w-2/3 mx-auto' color="failure">{err}</Alert>
            ) : (
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
                        {users.map(user => (
                            <Table.Row key={user.id}>
                                <Table.Cell>{user.joinDate}</Table.Cell>
                                <Table.Cell><img src={user.photoURL} alt={user.username} className='rounded-full  w-12 h-12'/></Table.Cell>
                                <Table.Cell>{user.username}</Table.Cell>
                                <Table.Cell>{user.email}</Table.Cell>
                                <Table.Cell className={user.isAdmin ? 'text-green-600' : 'text-red-500'}>{user.isAdmin ? 'Yes' : 'No'}</Table.Cell>
                                <Table.Cell>Delete</Table.Cell>
                            </Table.Row>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
}

export default Users;