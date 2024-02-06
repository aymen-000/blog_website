const {users} = require('../Models/UserModel')
const bcrypt = require('bcryptjs');
const { errorHandler } = require('../utils/error');

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
module.exports = {signup}