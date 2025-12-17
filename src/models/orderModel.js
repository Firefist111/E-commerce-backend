const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  user :{
    type : mongoose.Schema.Types.ObjectId,
    ref: 'USers',
    required : true
  },
  orderItems :{
    type : mongoose.Schema.Types.ObjectId,
    ref : "orderItems",
    required : true
  },
  orderDate :{
   type : Date,
   default : Date.now(),
  required : true
  },
  shippingAddress :{
   type : mongoose.Schema.Types.ObjectId,
    ref : "addresses",
    required : true
  },
  paymentDetails:{
    paymentMethod :{
      type : String
    },
    transactionId :{
      type : String
    },
    paymentId :{
      type : String
    },
    paymentStatus :{
      type : String,
      default : 'Pending'
    },
  },
  totalPrice :{
    type : Number,
    required : true
  },
  orderStatus:{
    type:String,
    required:true,
    default : 'Pending'
  },
  totalItem :{
    type : Number,
    required:true
  }
  ,
  createdAt:{
    type : Date,
    default : Date.now()
  }
  

},{timestamps:true})

const Order = mongoose.model('orders',orderSchema)

module.exports = Order