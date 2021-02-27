const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')
const Timer = require('../model/model').Timer
const router = express.Router()
const currentDirectoryArray = __dirname.split(path.sep)
const parentDirectoryArray = currentDirectoryArray.slice(0,currentDirectoryArray.length - 1)
const parentDirectory = parentDirectoryArray.join(path.sep)
const DATAFILE = path.join(parentDirectory,'data.json')
const publicDir = process.env.NODE_ENV === 'production'?'build':'public'
router.use(bodyParser.json())
router.use('/',express.static(path.join('./',`${publicDir}`)))
router.use((req,res,next)=>{
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
})

router.get('/api/timers',(req,res)=>{
    
    Timer.find((err,result)=>{
        
          if(err){
            return console.log(err.message)
        }
        if(result.length === 0){
            console.log(result)
            return res.redirect('/api/timers/new')
        }
        res.setHeader('Cache-Control', 'no-cache')
        res.json(result)
    })

})

router.get('/api/timers/new',(req,res)=>{
    
    fs.readFile(DATAFILE,(err,data)=>{
    const arrayOfData = JSON.parse(data)
   
    Timer.insertMany(arrayOfData,(err,docs)=>{
        res.json(docs)
    })
})

})

router.post('/api/timers',(req,res)=>{

    const {id,title,project,date,time,displayEdit} = req.body
  
    const timer = new Timer({id,title,project,date,time,displayEdit})
    
    timer.save((err,result)=>{
         if(err){
            console.log(err.message)
            return
        }
        res.setHeader('Cache-Control', 'no-cache');
            res.json(result)
    })
})

router.post('/api/timers/edit',(req,res)=>{

    const {id,title,project,date,time,displayEdit} = req.body

    Timer.findOneAndUpdate({id},{title,project,date,time,displayEdit},{useFindAndModify:false},(err,result)=>{
        if(err){
            console.log(err.message)
            return
        }
            res.setHeader('Cache-Control', 'no-cache')
            res.json(result)
    })
})

router.delete('/api/timers',(req,res)=>{
    
    const {id} = req.body

    Timer.findOneAndDelete({id},{useFindAndModify:false},(err)=>{
        if(err){
            console.log(err.message)
            return
        }
        Timer.find((err,result)=>{
             res.setHeader('Cache-Control', 'no-cache')
        res.json(result)
        })
       
    })
})

module.exports = router

