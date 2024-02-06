const {users} = require('../Models/UserModel')
const bcrypt = require('bcryptjs');
const { errorHandler } = require('../utils/error');
const cookies = require('cookies')
const cookie_parser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const signup =async (req , res , next)=>{
    const {username , email , password} = req.body ; 
    if (!username || !email || !password || username =='' || password=='' || email=="") {
        return next(errorHandler(400, 'All fields are required'))
    }
    const hashPassword = bcrypt.hashSync(password , 10 )
    const newUser =new users({username:username , email:email , password : hashPassword})
    try {
        await newUser.save()
        res.json('signup sucess')
    }catch(err){
        next(err)
    }
}
const signIn = async (req , res , next)=>{
    const {email , password} = req.body 
    if (!password|| !email || email=="" || password==""){
        return next(errorHandler(400 , 'All fields are required'))
    }
    try {
        const user = await users.findOne({email})
        if (!user){
            return next(errorHandler(400 ,'Invalid username or password')) ; 
        }
        const comparePasssword = bcrypt.compareSync(password , user.password)
        if (!comparePasssword) {
            return next(errorHandler(400 , "invalid Passowrd"))
        }
        const token = jwt.sign({id: user._id , username: user.username } , process.env.JWT_SECRET)
        const userWihthoutPassword = {
            id : user._id , 
            username : user.username , 
            email : user.email
        }
        res.status(200).cookie('token', token , {httpOnly:true}).json(userWihthoutPassword)
    }catch(err) {
        console.log(err.message)
        next(err)
    }
}
module.exports = {signup , signIn}