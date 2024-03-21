const { errorHandler } = require("../utils/error")
const {post}= require('../Models/PostModel')
const { now } = require("mongoose")
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
const getPosts =async (req , res , next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0 
        const limit = parseInt(req.query.limit) || 2 
        const sortDirection =  req.query.sort == 'asc' ? 1 : -1
        const posts = await post.find({
            ...(req.query.userid && {userId : req.query.userId}) , 
            ...(req.query.category && {category:req.query.category}) , 
            ...(req.query.postId && {_id:req.query.postId}) , 
            ...(req.query.searchTerm && {
                $or: [
                    {title:{ $regex : req.query.searchTerm , $option : "i"}},
                    {content:{$regex : req.query.searchTerm , $option : 'i'}},
                ]
            })
        }).sort({updatedAt : sortDirection}).skip(startIndex).limit(limit)
        const totalPosts = await post.countDocuments()
        const now = new Date()
        const lastmonth = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDay()  ,
        )
        const lastMonthBlogs = await post.countDocuments({
            createdAt:{ $gte: lastmonth}
        })
        res.status(201).json({posts , totalPosts , lastMonthBlogs})
    }catch(err) {
        next(err)
    }
}
const deletePost =async (req , res , next) =>{
    try {
        const {id} = req.body 
        if (id) {
            await post.findOneAndDelete({_id:id})
            res.status(201).json('ok')
        }else {
            next(errorHandler('401' , 'no id '))
        }
    }catch(err) {
        next(err)
    }


}
module.exports = {createPost , getPosts , deletePost}