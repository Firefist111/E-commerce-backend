const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  firstName :{
    type : String,
    required : true
  },
  lastName :{
    type : String,
    required : true
  },
  password :{
    type : String,
    required : true
  },
  email :{
    type : String,
    required : true,
    unique:true
  },
  role :{
    type : String,
    default : "Customer"
  },
  mobile:{
    type : String,

  },
  address:[
    {
      type : mongoose.Schema.Types.ObjectId,
      ref:"addresses"
    }
  ],
  paymentInfo :[
    {
      type : mongoose.Schema.Types.ObjectId,
      ref:'payment_Information'
    }
  ],
  rating :[{
     type : mongoose.Schema.Types.ObjectId,
     ref : 'ratings'

  }]
  ,
  reviews : [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'reviews'
    }
  ],
  createdAt : {
    type : Date,
    default:Date.now()
  }
},{timestamps:true})

const User = mongoose.model('users',userSchema)

module.exports = User

