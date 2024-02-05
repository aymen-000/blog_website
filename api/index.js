const express=require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
url = process.env.URL
const app = express()
mongoose.connect(url).then((result)=>{
    console.log('connected to the database')
}).catch((err)=>{
    console.log(err.message)
})
app.listen(3000 , ()=>{
    console.log('server is runing on port 3000')
})