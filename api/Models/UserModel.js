const mongoose = require('mongoose')

const Schema =new  mongoose.Schema({
    userName : {type :String , required: true , unique:true} , 
    email :{type :String , required: true },
    password :{type :String , required: true },
}, {timestamps:true})
const User = mongoose.model('User' , Schema)
module.exports = {User}