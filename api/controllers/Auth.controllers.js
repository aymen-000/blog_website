const {users} = require('../Models/UserModel')
const bcrypt = require('bcryptjs');
const { errorHandler } = require('../utils/error');
const cookies = require('cookies')
const cookie_parser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const generator = require('generate-password');
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
        const token = jwt.sign({id: user._id , username: user.username , isAdmin : user.isAdmin } , process.env.JWT_SECRET)
        const userWihthoutPassword = {
            id : user._id , 
            username : user.username , 
            email : user.email,
            photoURL : user.photoURL , 
            isAdmin : user.isAdmin 
        }
        
        res.status(200).cookie('token', token , {httpOnly:true}).json({userWihthoutPassword})
    }catch(err) {
        console.log(err.message)
        next(err)
    }
}
const googleSignIn =async (req , res , next)=>{
    const {username , email , photoUrl} = req.body 
    const user =await users.findOne({email})
    try {
        if (user) {
            const token = jwt.sign({id : user._id , username : user.username} , process.env.JWT_SECRET )
            const userWihthoutPassword = {
                id : user._id , 
                username : user.username , 
                email : user.email , 
                photoURL : user.photoURL , 
                isAdmin : user.isAdmin
            }
            res.status(200).cookie('token' , token).json({userWihthoutPassword})
        }else {
            const generatePassword = generator.generate({length:15 , numbers:true })
            const hashedPassword = bcrypt.hashSync(generatePassword , 10)
            const newUser = new users({email , password:hashedPassword , username , photoURL : photoUrl})
            await newUser.save()
            const token = jwt.sign({id : newUser._id , username : newUser.username,  isAdmin : newUser.isAdmin} , process.env.JWT_SECRET )
            const userWihthoutPassword = {
                id : newUser._id , 
                username : newUser.username , 
                email : newUser.email , 
                photoURL : newUser.photoURL, 
                isAdmin : newUser.isAdmin
            }
            res.status(200).cookie('token' , token).json({userWihthoutPassword})
        }
    }catch(err) {
        next(err)
    }
}
const signOut = (req , res , next) =>{
    try {
        res.clearCookie('token').json('done')
    }catch(error) {
        next(error)
    }
}
module.exports = {signup , signIn , googleSignIn , signOut}