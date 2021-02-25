const path = require('path')
require('dotenv').config({path:path.join('..','..','.env')});
require('dotenv').config({ debug: process.env.DEBUG });
const passport = require('passport')
const express = require('express') 
const bodyParser = require('body-parser') 
const router = express.Router()  
const FacebookStrategy = require('passport-facebook').Strategy
const session = require('express-session')
const User = require('../model/model').User 
router.use(session({secret:process.env.SESSION_SECRET,resave:false,saveUninitialized:false}))
router.use(bodyParser.urlencoded({extended:true}))
router.use(express.static('public'))
router.use(passport.initialize()) 
router.use(passport.session())

//use passport-facebook strategy 
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID, 
    clientSecret: process.env.FACEBOOK_APP_SECRET, 
    callbackURL: process.env.NODE_ENV === 'production'?process.env.FACEBOOK_CALLBACK_URL_PROD:process.env.FACEBOOK_CALLBACK_URL_DEV
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({facebookId:profile.id}, function(err, user) {
      if (err) { return done(err); }
      done(null, user);
      
    });
  }
));

//serialize session
passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  //deserialize session
  passport.deserializeUser(function(id, done) { 
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

router.get('/',passport.authenticate('facebook'))

router.get('/callback',passport.authenticate('facebook',{successRedirect:'/blog',failureRedirect:'/signIn'}))

module.exports = router 