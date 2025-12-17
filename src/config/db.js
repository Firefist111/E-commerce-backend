const mongoose = require('mongoose')

const connectDB = async()=>{

  try {
    await mongoose.connect(process.env.MONGOURL)
    console.log('MongoDb connected successfully')
  } catch (error) {
    console.log('MongoDb failed to connect')
    
  }
}

module.exports= connectDB