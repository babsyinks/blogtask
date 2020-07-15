const express = require('express')
const app = express()

const generalRoutes = require('./routes/generalRoutes')
const localRoutes = require('./routes/localRoutes')
const blogRoutes = require('./routes/blogRoutes')
const facebookRoutes = require('./routes/facebookRoutes')
const timerRoutes = require('./routes/timerRoutes')
const profileRoutes = require('./routes/profileRoutes')

app.set('view engine','ejs') 

app.use(generalRoutes)
app.use(localRoutes)
app.use(timerRoutes)
app.use(profileRoutes)
app.use('/blog',blogRoutes)
app.use('/auth/facebook',facebookRoutes)
app.use((err,req,res,next)=>{ 
    console.log(err.message) 
    res.status(400).send(err.message)
})
 
app.listen(3001,function(){ 
    console.log('Listening on port 3001') 
})

