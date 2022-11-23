const passport = require('passport')
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser') 
const session = require('express-session')

const User = require('../model/model').User  
const BlogPost = require('../model/model').BlogPost
router.use(session({secret:'loon',resave:false,saveUninitialized:false}))
router.use(bodyParser.urlencoded({extended:true}))
router.use(express.static('public'))
router.use(passport.initialize()) 
router.use(passport.session())

//use passport local mongoose create strategy method
passport.use(User.createStrategy())

//serialize session
passport.serializeUser(function(user, done) {
    done(null, user.id)
  })
  //deserialize session
  passport.deserializeUser(function(id, done) { 
    User.findById(id, function(err, user) {
      done(err, user)
    })
  })
module.exports = {User,BlogPost,passport,router}