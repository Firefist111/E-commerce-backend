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

const adminProductRouter = require('./routes/adminProductRoute.js')
app.use('/api/admin/products',adminProductRouter)

const productRouter = require('./routes/productRoute.js')
app.use('/api/products',productRouter)

const adminOrderRouter = require('./routes/adminRoute.js')
app.use('api/admin/orders',adminOrderRouter)

const orderRouter = require('./routes/orderRoute.js')
app.use('/api/orders',orderRouter)

const cartItemRouter = require('./routes/cartItemRoute.js')
app.use('/api/cart_items',cartItemRouter)

const cartRouter = require('./routes/cartRoutes.js')
app.use('/api/cart',cartRouter)

const reviewRouter = require('./routes/reviewRoute.js')
app.use('/api/review',reviewRouter)

const ratingRouter = require('./routes/ratingRoute.js')
app.use('/api/rating',ratingRouter)



//start server

module.exports = app