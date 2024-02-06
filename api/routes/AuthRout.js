const express = require('express')
const {signup, signIn} = require('../controllers/Auth.controllers')
const Authrouter = express.Router()
Authrouter.post('/signup' , signup)
Authrouter.post('/signin' , signIn)
module.exports ={Authrouter}