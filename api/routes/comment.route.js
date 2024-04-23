const express = require('express')
const {Comment} = require('../Models/CommentsModel')
const {addComment , getComments, getUserById , updateCommentsInfo} = require('../controllers/comment.controllers')
const CommentRouter = express.Router()
CommentRouter.post('/addComment' , addComment)
CommentRouter.get('/getComments' , getComments)
CommentRouter.get('/getUserById/:id', getUserById)
CommentRouter.post('/updateCommentsInfo' , updateCommentsInfo)
module.exports = {CommentRouter}