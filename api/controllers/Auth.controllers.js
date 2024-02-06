const {User} = require('../Models/UserModel')
const bcrypt = require('bcryptjs')

const signup =async (req , res)=>{
    const {username , email , password} = req.body ; 
    if (!username || !email || !password || username =='' || password=='' || email=="") {
        return res.status(400).json({message : 'all fields are required'})
    }
    const hashPassword = bcrypt.hashSync(password , 10 )
    const newUser =new User({username , email , password : hashPassword})
    try {
        await newUser.save()
        res.json('signup sucess')
    }catch(err){
        res.status(500).send(err.message)
    }
}
module.exports = {signup}