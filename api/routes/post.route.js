const express = require('express')
const { verify } = require('jsonwebtoken')
const Postrouter = express.Router()
const {createPost , getPosts, deletePost} = require('../controllers/post.controllers')
const {verifytoken} = require('../utils/verifyToken')
Postrouter.post('/create' , createPost)
Postrouter.get('/getPosts' , getPosts)
Postrouter.post('/deletePost' , deletePost)
module.exports = {Postrouter}