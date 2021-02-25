const express = require('express')
const{signOut,adminSignIn} = require('../links')
const auth = require('../middlewares/adminAuth')
const{User,BlogPost,passport,router} = require('../passaportLocal/passportLocal')
/* router.use('/admin',express.static('public'))
router.use('/admin/editPost',express.static('public'))
router.use('/adminRedirect',express.static('public')) */

/* router.get('/',(req,res)=>{
  res.redirect('/signIn')
}) */

router.get('/signIn',(req,res)=>{
res.render('signIn',{validation:'',validateSignIn:'',
headerData:adminSignIn.headerData, url:adminSignIn.url,loggedIn:''})
})

router.get('/signInFailure',(req,res)=>{
    res.render('signIn',{validation:'',validateSignIn:'Invalid Username or Password.',
    headerData:adminSignIn.headerData, url:adminSignIn.url,loggedIn:''})
})

router.get('/adminSignIn',(req,res)=>{
    res.render('adminSignIn',{adminValidator:'',loggedIn:''})
})

router.post('/admin',(req,res)=>{

    const{username,password} = req.body
   
    const role = 'admin'
    const user = new User({username,password,role})

    User.findOne({username},(err,doc)=>{
        if(!doc){
           return res.redirect('/adminSignIn')
        }

        if(doc.role === 'admin'){ 

              req.logIn(user,function(err){

      
        if(err){
             return console.log('error in login attempt',err.message)
         }

         passport.authenticate('local',{successRedirect:`/admin`,failureRedirect:`/adminSignIn`})(req,res)
  }) 
        }
        else{

            res.render('adminSignIn',{adminValidator:'Only admin can sign in',headerData:signOut.headerData,url:signOut.url,loggedIn:''})

        }
    })
   
  
   
})

router.get('/admin',auth,(req,res)=>{
        const profileLoaded = req.user.getImageBufferLength()
        const{surname,firstName} = req.user.profile
        res.render('admin',{headerData:signOut.headerData,url:signOut.url,loggedIn:'loggedIn',id:req.user._id,profileLoaded,surname,firstName})
     
})

router.get('/admin/newPost',auth,(req,res)=>{
        const{surname,firstName} = req.user.profile
        const profileLoaded = req.user.getImageBufferLength()
        res.render('newPost',{headerData:signOut.headerData,url:signOut.url,loggedIn:'loggedIn',id:req.user._id,profileLoaded,surname,firstName})

})

router.post('/admin/newPost',auth,(req,res)=>{
    const title = req.body.title
    const content = req.body.content
    const datePosted = new Date().toDateString()
  
    if(title.length === 0 || content.length === 0){
        return res.render('adminStatusMessage',{status:'Empty Fields are not allowed',adminRedirect:`/admin`})
    }
    const newPost = new BlogPost({title,content,datePosted})
    
    newPost.save((err,doc)=>{
        if(err){
            if(err.code === 11000){
                return res.render('adminStatusMessage',{status:'The post title already exist,pick another title.\
                ',adminRedirect:`/admin`})
            }
            res.render('adminStatusMessage',{status:'The post could not be saved,please try again later or \
            check the log for details',adminRedirect:`/admin`})
        }
        else{

            res.render('adminStatusMessage',{status:'New post saved successfully',adminRedirect:`/adminRedirect/${doc._id}`})

        }
    })
})
 
router.get('/admin/editPost',auth,(req,res)=>{
    const{surname,firstName} = req.user.profile
    const profileLoaded = req.user.getImageBufferLength()
    res.render('editPostFinder',{headerData:signOut.headerData,url:signOut.url,validation:'',loggedIn:'loggedIn',id:req.user._id,profileLoaded,surname,firstName})
})

router.post('/admin/editPost',auth,(req,res)=>{
    const title = req.body.editTitle
    const profileLoaded = req.user.getImageBufferLength()
    const{surname,firstName} = req.user.profile
    if(title.length === 0){
        return res.render('editPostFinder',{headerData:signOut.headerData,
                url:signOut.url,validation:'Title field is empty,enter a title',loggedIn:'loggedIn',id:req.user._id,profileLoaded,surname,firstName})
    }
    BlogPost.findOne({title},(err,doc)=>{
        if(err){
            return console.log(err.message)
        }
        else if(!doc){
            return res.render('editPostFinder',{headerData:signOut.headerData,
                url:signOut.url,validation:'The title does not exist',loggedIn:'loggedIn',id:req.user._id,profileLoaded,profileLoaded,surname,firstName})
        }
        res.render('editPost',{post:doc})
    })
})

router.post('/admin/editPost/update',auth,(req,res)=>{
const id = req.body.id
const title = req.body.title
const content = req.body.content
const successMessage = 'Edit Operation Successful'
const failureMessage = 'Edit Operation Failed check logs for details'

BlogPost.findOne({title},(err,doc)=>{ 
    if(doc){
        BlogPost.findByIdAndUpdate(id,{content},{useFindAndModify:false},(err)=>{
            if(err){
                console.log(err.message)
               return res.render('adminStatusMessage',{status:failureMessage,adminRedirect:`/adminRedirect/${doc._id}`})
            }
            res.render('adminStatusMessage',{status:successMessage,adminRedirect:`/adminRedirect/${doc._id}`})
})
    }
    else{
        BlogPost.findByIdAndUpdate(id,{title,content},{useFindAndModify:false},(err,doc)=>{
            if(err){
                console.log(err.message)
               return res.render('adminStatusMessage',{status:failureMessage,adminRedirect:`/adminRedirect/${doc._id}`})
            }
            res.render('adminStatusMessage',{status:successMessage,adminRedirect:`/adminRedirect/${doc._id}`}) 
        })
    }
})

})

router.get('/admin/deletePost',auth,(req,res)=>{
    const profileLoaded = req.user.getImageBufferLength()
    const{surname,firstName} = req.user.profile
    res.render('deletePost',{headerData:signOut.headerData,url:signOut.url,loggedIn:'loggedIn',id:req.user._id,profileLoaded,surname,firstName}) 
})

router.post('/admin/deletePost',auth,(req,res)=>{
    const {deletePostTitle} = req.body
    const successMessage = 'Delete Operation Successful'
    const failureMessage = 'Delete Operation Failed check logs for details'

    if(deletePostTitle.length === 0){
       return res.render('adminStatusMessage',{status:'Empty Fields are not allowed',adminRedirect:`/admin`})
    }

    BlogPost.findOne({title:deletePostTitle},(err,doc)=>{
        if(err){
            return console.log(err.message)
        }
        else if(!doc){
            return  res.render('adminStatusMessage',{status:`There is no document titled: ${deletePostTitle}`,adminRedirect:`/admin`})
        } 
        else{
           BlogPost.findOneAndDelete({title:deletePostTitle},{useFindAndModify:false},(err)=>{
                if(err){
                  console.log(err.message)
                return res.render('adminStatusMessage',{status:failureMessage,adminRedirect:`/adminRedirect/${doc._id}`})
        }
        res.render('adminStatusMessage',{status:successMessage,adminRedirect:`/adminRedirect/${doc._id}`})
    })  
        }
    })

   
})

router.get('/adminRedirect/:id',auth,(req,res)=>{
    const id = req.params.id
    const profileLoaded = req.user.getImageBufferLength()
    const{surname,firstName} = req.user.profile
    BlogPost.findById(id,(err,doc)=>{
        if(err){
            return console.log(err.message)

        }
        
            if(doc){

               return res.render('admin',{adminValidator:'',headerData:signOut.headerData,url:signOut.url,loggedIn:'loggedIn',id:req.user._id,profileLoaded,surname,firstName})

            }
            res.render('admin',{adminValidator:'',headerData:signOut.headerData,url:signOut.url,loggedIn:'loggedIn',id:req.user._id,profileLoaded,surname,firstName}) 
       
    })
}

)

router.get('/admin/registerAdmin',auth,(req,res)=>{
    const profileLoaded = req.user.getImageBufferLength()
    const{surname,firstName} = req.user.profile
    res.render('registerAdmin',{adminValidator:'',headerData:signOut.headerData,url:signOut.url,loggedIn:'loggedIn',id:req.user._id,profileLoaded,surname,firstName})
})

module.exports = router 