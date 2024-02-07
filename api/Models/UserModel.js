const { Timestamp } = require('mongodb')
const mongoose = require('mongoose')

const shcema =new mongoose.Schema({
    username : { type: String } , 
    email : String , 
    password :String ,
    photoURL : {type : String , default : './uploads/profile.jpg'}
} , {Timestamp:true})

const users = mongoose.model('users' , shcema)
module.exports = {users}