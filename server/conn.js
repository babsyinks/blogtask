const mongoose = require('mongoose') 
const path = require('path')
require('dotenv').config({path:path.join('..','.env')});
require('dotenv').config({ debug: process.env.DEBUG });
const connStr = process.env.NODE_ENV === 'production'?process.env.MONGODB_CONN_STR_PROD:process.env.MONGODB_CONN_STR_DEV
const mongoose1 = mongoose.createConnection(connStr,{useNewUrlParser: true, useUnifiedTopology: true})

mongoose1
.then(()=>{
    console.log('Connected to DB successfully')
})
.catch((err)=>{
    console.log(`Connection to Db failed: ${err.message}`)
   
})

module.exports = {mongoose1}