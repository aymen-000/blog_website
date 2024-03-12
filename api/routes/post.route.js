const express = require('express')
const { verify } = require('jsonwebtoken')
const Postrouter = express.Router()
const {createPost , getPosts} = require('../controllers/post.controllers')
const {verifytoken} = require('../utils/verifyToken')
Postrouter.post('/create' , createPost)
Postrouter.get('/getPosts' , getPosts)
module.exports = {Postrouter}