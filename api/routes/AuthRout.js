const express = require('express')
const {signup, signIn ,googleSignIn} = require('../controllers/Auth.controllers')
const Authrouter = express.Router()
Authrouter.post('/signup' , signup)
Authrouter.post('/signin' , signIn)
Authrouter.post('/google' , googleSignIn)
module.exports ={Authrouter}