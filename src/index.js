const express = require("express");
const cors = require('cors')
const app = express();

require('dotenv').config()

//middlewares
app.use(cors())
app.use(express.json())

//routes
const authRouter = require('./routes/authRoute.js')
app.use('/auth',authRouter)

const userRouter = require('./routes/userRoute.js')
app.use('/api/users',userRouter)
//start server

module.exports =app