const express = require('express')
const {Comment} = require('../Models/CommentsModel')
const { users } = require('../Models/UserModel')
const addComment =async (req , res , next) =>{
    try {
        const {content , userId , postId} = req.body
        
        if (!content || !userId || !postId) {
            next(errorHandler(401  , 'something missing'))
        }else {
            const newComment = new Comment({
                content ,
                postId ,
                userId 
            })
            await newComment.save() 
            
            res.status(201).json(newComment)
        }
    }catch(err){
        console.log("errr")
        next(err)
    }

}
const getComments = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const endIndex = parseInt(req.query.endIndex) || 2;
        const postId = req.query.postId;
        
        const allComments = await Comment.find({ postId }).skip(startIndex).limit(endIndex);
        const numOfComments = await Comment.countDocuments({ postId });
        
        res.status(200).json({ allComments, numOfComments });
    } catch (err) {
        next(err);
    }
};
const getUserById = async (req, res, next) => {
    const { id } = req.params; 
    try {
        const user = await users.findById(id);
        if (user) {
            res.status(200).json(user); 
        } else {
            res.status(404).json('not found'); 
        }
    }catch(err) {
        console.log(err)
    }

};
const updateCommentsInfo = async (req, res, next) => {
    const { num, userId, postId } = req.body;
    try {
        
        const updateComment = await Comment.findOneAndUpdate({postId}, {
            $set: { numberOfLikes: num },
            $push: { likes: userId }
        }, { new: true });
        console.log(updateComment)
        res.status(200).json(updateComment);
    } catch (err) {
        console.error(err.message);
        next(err)
    }
};
module.exports = {addComment , getComments, getUserById , updateCommentsInfo}