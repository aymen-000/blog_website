 
const express = require('express')
const {getUsers , deleteUsers} = require('../controllers/users.controllers')

const usersRouter = express.Router()
usersRouter.get('/getUsers' , getUsers)
usersRouter.delete('/deleteUser/:id' , deleteUsers)
module.exports = {usersRouter}