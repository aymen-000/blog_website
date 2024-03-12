const { errorHandler } = require("../utils/error")
const {post}= require('../Models/PostModel')
const createPost = async (req , res , next) => {
    const {title , content, image , category, userId } = req.body 
    if (!title || !content) {
        next(errorHandler(401 , "Fill All The Information"))
    }else {
        const newPost = new post({
            ...req.body
        })
        try {
            newPost.save()
            res.json(newPost)
        }catch(err) {
            next(errorHandler(err))
        }
    }
}
module.exports = {createPost}