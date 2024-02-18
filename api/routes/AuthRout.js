const express = require('express')
const {signup, signIn ,googleSignIn , signOut} = require('../controllers/Auth.controllers')
const {updateInformation} = require('../controllers/Update.controllers')
const Authrouter = express.Router()
Authrouter.post('/signup' , signup)
Authrouter.post('/signin' , signIn)
Authrouter.post('/google' , googleSignIn)
Authrouter.post('/updateInformation' , updateInformation)
Authrouter.get('/signout' , signOut)
module.exports ={Authrouter}