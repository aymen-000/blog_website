const mongoose = require('mongoose')

const Schema =new  mongoose.Schema({
    username : {type :String , required: true } , 
    email :{type :String , required: true },
    password :{type :String , required: true },
}, {timestamps:true})
const user = mongoose.model('user' , Schema)
module.exports = {user}