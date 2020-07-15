const{User,passport,router} = require('../passaportLocal/passportLocal')
const{signOut} = require('../links')
const auth = require('../middlewares/userAuth')
const sharp = require('sharp')
const multer = require('multer')
const express = require('express')
const{Profile} = require('../model/model')

router.use(express.urlencoded({extended:true}))

const upload = multer({
                        limits:{fileSize:1000000 },
                        fileFilter(req,file,cb){    
                        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
                           return cb(new Error("invalid image format."))
                        }
                        cb(undefined,true)
                           },
                           onError : function(err, next) {
                            console.log('error', err);
                            next(err);
                          }
                        })   
                            


router.get('/profile',auth,(req,res)=>{
    res.render('profile',{headerData:signOut.headerData,url:signOut.url,loggedIn:''})
})

router.post('/profile',auth,upload.single('file'),async (req,res)=>{

    const buffer = await sharp(req.file.buffer).resize({width:50,height:50}).png().toBuffer() 

    req.user.profile = new Profile({surname:req.body.surname,firstName:req.body.firstName,profilePic:buffer})

    await req.user.save() 
    if(req.user.role === "admin"){ 
        return res.render('adminStatusMessage',{status:'Profile Successfully Created',adminRedirect:`/adminRedirect/${req.user._id}`})
    }

    res.render('adminStatusMessage',{status:'Profile Successfully Created',adminRedirect:`/blog`})

},(err,req,res,next)=>{
    res.status(400).send({error:err.message})
})

router.get('/profile/:id/profilePic',auth,async (req,res)=>{
    const{id} = req.params

    try{
    const user = await User.findById(id)
    let profilePic
    if(!user.profile.profilePic){
        profilePic = ''
        return res.send(profilePic)
    }
    
        profilePic = user.profile.profilePic

    res.set('Content-Type','image/png')

    res.send(profilePic)

    }
    catch(err){
        
        res.status(404).send({error:err.message})
    }
   
})

router.get('/editProfile',auth,(req,res)=>{
    const{surname,firstName,profilePic} = req.user.profile

    res.render('editProfile',{headerData:signOut.headerData,url:signOut.url,loggedIn:'',surname,firstName,profilePic})
})

router.post('/editProfile',upload.single('file'),auth,async (req,res)=>{
    let buffer
    if(!req.body.surname && !req.body.firstName && !req.file){
        return res.render('adminStatusMessage',{status:'You must edit at least one field',adminRedirect:`/adminRedirect/${req.user._id}`})
    }
    if(req.body.surname.length>12 || req.body.firstName.length>12){
        return res.render('adminStatusMessage',{status:'Surname and Firstname must not exceed 12 characters',adminRedirect:`/adminRedirect/${req.user._id}`})
    }
    if(req.file){
        buffer = await sharp(req.file.buffer).resize({width:50,height:50}).png().toBuffer()
        req.user.profile.profilePic = buffer
    }   

    req.user.profile.surname = req.body.surname?req.body.surname:req.user.profile.surname

    req.user.profile.firstName = req.body.firstName?req.body.firstName:req.user.profile.firstName

    await req.user.save() 

    if(req.user.role === "admin"){
         return res.render('adminStatusMessage',{status:'Profile Successfully Updated',adminRedirect:`/adminRedirect/${req.user._id}`})
    }
    res.render('adminStatusMessage',{status:'Profile Successfully Updated',adminRedirect:`/blog`})

}) 

router.get('/acctMgtNew',auth,(req,res)=>{
    const profileLoaded = req.user.getImageBufferLength()
    const link ='/profile'
    const linkData = 'Create A New Profile'
    res.render('acctMgt',{headerData:signOut.headerData,url:signOut.url,loggedIn:'loggedIn',profileLoaded,link,linkData})
})

router.get('/acctMgtEdit',auth,(req,res)=>{
    const profileLoaded = req.user.getImageBufferLength()
    const link ='/editProfile'
    const linkData = 'Edit Your Profile'
    const{surname,firstName} = req.user.profile
    res.render('acctMgt',{headerData:signOut.headerData,url:signOut.url,loggedIn:'loggedIn',profileLoaded,link,linkData,surname,firstName,id:req.user._id})
})

router.get('/deleteAcct',auth,async (req,res)=>{

const adminRedirect = '/signIn'
let status = ''
try{
await req.user.remove()
status = 'Account Successfully Removed'
}
catch(e){
console.log(e.message)
status = "Couldn't remove account.Try again later"
}


res.render('adminStatusMessage',{status,adminRedirect})

})
 
module.exports = router