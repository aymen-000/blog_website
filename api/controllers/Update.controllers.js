const express = require('express')
const {users}  = require('../Models/UserModel')
const updateInformation = async (req , res , next) =>{
    const  {email , username , paswsord} = req.body
    const userSearch =  await users.findOne({email , username})
    if (userSearch) {
        userSearch.updateOne({email , username})
    }

}