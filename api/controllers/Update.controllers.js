const express = require('express')
const { users } = require('../Models/UserModel')
const { errorHandler } = require('../utils/error')
const bcrybt = require('bcryptjs')
const updateInformation = async (req, res, next) => {
    const { password , newUserName , email ,tempImageUrl , id } = req.body
    console.log(password)
    console.log(newUserName)
    console.log(email)
    console.log(tempImageUrl)
    console.log(id)
    try {
        if (!newUserName || newUserName == "" || !email || email == "") {
            return next(errorHandler(500, 'please fill all the information'))
        } else {
                const hashedPassword =bcrybt.hashSync(password , 10 )
                await users.findOneAndUpdate({id} , {email , photoURL:tempImageUrl , username:newUserName , password : hashedPassword})
                
                res.status(201).json('updated sucessfuly')
            }
    }catch(err) {
        next(err)
    }
}

module.exports  = { updateInformation }