const { Timestamp } = require('mongodb')
const mongoose = require('mongoose')

const shcema =new mongoose.Schema({
    username : { type: String } , 
    email : String , 
    password :String ,
} , {Timestamp:true})

const users = mongoose.model('users' , shcema)
module.exports = {users}