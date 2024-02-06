const express = require('express')
const {signup} = require('../controllers/Auth.controllers')
const Authrouter = express.Router()
Authrouter.post('/' , signup)
module.exports ={Authrouter}