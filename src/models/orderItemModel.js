const mongoose = require('mongoose')

const orderItemSchema = new mongoose.Schema({
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

const OrderItem = mongoose.model('orderItems',orderItemSchema)

module.exports = OrderItem