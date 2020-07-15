const mongoose = require('mongoose') 

const mongoose1 = mongoose.createConnection('mongodb://localhost:27017/blogDB',{useNewUrlParser: true, useUnifiedTopology: true})
const mongoose2 = mongoose.createConnection('mongodb://localhost:27017/TimerDB',{useNewUrlParser: true, useUnifiedTopology: true})

mongoose1
.then(()=>{
    console.log('Connected to blogDB successfully')
})
.catch((err)=>{
    console.log(`Connection to blogDb failed: ${err.message}`)
   
})

mongoose2
.then(()=>{
    console.log('Connected to TimerDB successfully')
})
.catch((err)=>{
    console.log(`Connection to TimerDb failed: ${err.message}`)
    
})

module.exports = {mongoose1,mongoose2}