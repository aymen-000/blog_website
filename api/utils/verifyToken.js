const {errorHandler}= require('./error')
const env = require('dotenv').config
const jwt = require('jsonwebtoken')
const verifytoken = (req , res , next) => {
    const token = req.cookies?.access_token ; 
    console.log(res)
    console.log(token)
    if (!token) {
        return next(errorHandler(404, "unauthorized"))
    }
    jwt.verify(token , process.env.JWT_SECRET , (err , result)=>{
        if (err) {
            next(errorHandler(401 , "unauthorized"))
        }
        next()
    })
}
module.exports = {verifytoken}