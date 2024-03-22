
const mongoose = require('mongoose')
const { users } = require('../Models/UserModel')

const getUsers  = async (req  ,res ,  next) => {
    try {
        const getUsers  = await users.find({})
        res.status(201).json(getUsers)
    }catch(err) {
        next(err)
    }
}
module.exports = {getUsers}