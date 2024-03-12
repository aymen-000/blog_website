const express = require('express')
const { verify } = require('jsonwebtoken')
const Postrouter = express.Router()
const {createPost} = require('../controllers/post.controllers')
const {verifytoken} = require('../utils/verifyToken')
Postrouter.post('/create' , createPost)
module.exports = {Postrouter}