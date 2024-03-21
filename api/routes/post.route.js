const express = require('express')
const { verify } = require('jsonwebtoken')
const Postrouter = express.Router()
const {createPost , getPosts, deletePost , getOnePost} = require('../controllers/post.controllers')
const {verifytoken} = require('../utils/verifyToken')
Postrouter.post('/create' , createPost)
Postrouter.get('/getPosts' , getPosts)
Postrouter.post('/deletePost' , deletePost)
Postrouter.get('/getOnePost/:id' , getOnePost)
module.exports = {Postrouter}