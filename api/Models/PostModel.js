const mongoose = require('mongoose')
const postSchema = new mongoose.Schema({
    userId : {
        type : String , 
        required : true
    } , 
    title : {
        type : String
    }, 
    content : {
        type : String ,
    }, 
    image : {
        type : String , 
        default : "http://localhost:3000/Models/uploads/blog.jpg"
    } , 
    category : {
        type:String ,
        default : "none"
    },
}, {timestamps:true})
const post = mongoose.model('post' , postSchema)
module.exports = {post}