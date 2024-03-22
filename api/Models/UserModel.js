const { Timestamp } = require('mongodb')
const mongoose = require('mongoose')

const shcema =new mongoose.Schema({
    username : { type: String } , 
    email : String , 
    password :String ,
    photoURL : {type : String , default : 'https://firebasestorage.googleapis.com/v0/b/mern-7f320.appspot.com/o/profile.jpg?alt=media&token=f245bbbf-e69c-4669-bb4d-0642d4370f25'},
    isAdmin : {type : Boolean , default : false}
} , {timestamps:true})

const users = mongoose.model('users' , shcema)
module.exports = {users}