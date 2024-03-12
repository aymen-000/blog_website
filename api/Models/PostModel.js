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
        default : "https://firebasestorage.googleapis.com/v0/b/mern-7f320.appspot.com/o/blog.jpg?alt=media&token=42553d51-dffb-453c-9f35-a215e1ee345a"
    } , 
    category : {
        type:String ,
        default : "none"
    },
}, {timestamps:true})
const post = mongoose.model('post' , postSchema)
module.exports = {post}