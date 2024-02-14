const express = require('express')
const {users}  = require('../Models/UserModel')
const { errorHandler } = require('../utils/error')
const updateInformation = async (req , res , next) =>{
    const  {password , newUserName , email ,tempImageUrl , id} = req.body
    if (!password) {
        if (!newUserName || newUserName == "" || !email || email=="" ) {
            next(errorHandler(500 , 'please fill all the information'))
        }else {
            const user = await users.findById({id})
            user.updateOne({email , username : newUserName , tempImageUrl})
        }
    }else {
        if (!newUserName || newUserName == "" || !email || email=="" ) {
            next(errorHandler(500 , 'please fill all the information'))
        }else {
            const user = await users.findById({id})
            user.updateOne({email , username : newUserName , tempImageUrl , password:})
        }
    }
    const userSearch =  await users.findOne({password , newUserName , email ,tempImageUrl})
    if (userSearch) {
        userSearch.updateOne({email , username})
    }

}