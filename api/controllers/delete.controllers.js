const express = require('express')
const {users} = require('../Models/UserModel')
const DeleteUser =async (req , res , next)=> {
    const {id} = req.body
    try {
        console.log("delete start")
        console.log(id)
        await users.deleteOne({_id:id})
        res.status(201).json('done')
    }catch(err) {
        next(err)
    }
}
module.exports = {DeleteUser}