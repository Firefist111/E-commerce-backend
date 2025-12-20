const mongoose = require('mongoose')

const cartItemSchema = new mongoose.Schema({
  cart :{
    type : mongoose.Schema.Types.ObjectId,
    raf : "cart",
    required : true
  },
  product :{
   type : mongoose.Schema.Types.ObjectId,
    raf : "products",
    required : true
  },
  size :{
   type : String,
    required : true
  },
  quantity :{
     type : Number,
    required : true,
    default:1
  },
  price:{
    type : Number,
    required : true
  },
  discountedPrice :{
     type : Number,
    required : true
  },
  user:{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'users',
    required:true
  }
},{timestamps:true})

const CartItem = mongoose.model('cartItems',cartItemSchema)

module.exports = CartItem