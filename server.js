const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 3001
const generalRoutes = require('./server/routes/generalRoutes')
const localRoutes = require('./server/routes/localRoutes')
const blogRoutes = require('./server/routes/blogRoutes')
const facebookRoutes = require('./server/routes/facebookRoutes')
const timerRoutes = require('./server/routes/timerRoutes')
const profileRoutes = require('./server/routes/profileRoutes')

app.set('view engine','ejs')  
app.use(express.static(path.join(__dirname,'client','public')))
app.use(generalRoutes)
app.use(localRoutes)
app.use(timerRoutes)
app.use(profileRoutes)
app.use('/blog',blogRoutes)
app.use('/auth/facebook',facebookRoutes)
app.get('*',(req,res)=>{
    res.redirect('/')
})
app.use((err,req,res,next)=>{ 
    console.log(err.message) 
    res.status(400).send(err.message)
})
 
app.listen(port,function(){ 
    console.log('Listening on port 3001') 
})

