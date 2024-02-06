const express=require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const {router } = require('./routes/user.route')
const {User} = require('./Models/UserModel')
const {Authrouter} = require('./routes/AuthRout')
const cors = require('cors')
const bodyParser = require('body-parser')


dotenv.config()
url = process.env.URL
const app = express()
app.use(express.json())
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
mongoose.connect(url).then((result)=>{
    console.log('connected to the database')
}).catch((err)=>{
    console.log(err.message)
})
app.listen(3000 , ()=>{
    console.log('server is runing on port 3000')
})
app.use('/api' , router)
app.use('/api' , Authrouter)

app.use((err , req , res , next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "internal server error" ; 
    res.status(statusCode).json({
        sucess : false  , 
        statusCode , 
        message
    })
})