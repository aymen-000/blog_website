const express = require('express')
const {signup, signIn ,googleSignIn} = require('../controllers/Auth.controllers')
const {updateInformation} = require('../controllers/Update.controllers')
const Authrouter = express.Router()
Authrouter.post('/signup' , signup)
Authrouter.post('/signin' , signIn)
Authrouter.post('/google' , googleSignIn)
Authrouter.post('/updateInformation' , updateInformation)
module.exports ={Authrouter}