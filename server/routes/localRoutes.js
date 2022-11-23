const{User,passport,router} = require('../passaportLocal/passportLocal')
const{signOut,adminSignIn} = require('../links')
router.post('/register',(req,res)=>{  
    const username = req.body.username
    const password = req.body.password
    const password_again = req.body.password_again
    const successRedirect = req.body.admin?'/admin':'/blog'
    const failureRedirect = req.body.admin?'/admin/registerAdmin':'/signIn'
    const failureRender = req.body.admin?'registerAdmin':'signIn'
    const loggedIn = req.body.admin?'loggedIn':''
    const id = req.body.admin?req.user._id:''
    const profileLoaded = req.body.admin? req.user.getImageBufferLength():''
    const {surname,firstName} = req.body.admin?req.user.profile:{surname:'',firstName:''}
    const headerData = req.body.admin?signOut.headerData:adminSignIn.headerData
    const url = req.body.admin?signOut.url:adminSignIn.url

    if(password !== password_again){
        return res.render(failureRender,{validation:'Password Mismatch',validateSignIn:'',
        headerData,url,adminValidator:'Password Mismatch',loggedIn,id,profileLoaded,surname,firstName})
    }
    else if(password.length<6){
        return res.render(failureRender,{validation:'Password must be atleast 6 characters long',validateSignIn:'',
        headerData,url,adminValidator:'Password must be atleast 6 characters long',loggedIn,id,profileLoaded,surname,firstName})
    }
    let user = {username,role:req.body.admin?req.body.admin:'guest'}
   
    User.register(user,password,(err,user)=>{ 

            if (err) {
                if(err.name === 'UserExistsError'){
                   return res.render(failureRender,{validation:'Username already exist',validateSignIn:'',
                   headerData,url,adminValidator:'Username already exist',loggedIn,id,profileLoaded,surname,firstName})
                }
                else if(err.message === 'No username was given'){
                  return res.render(failureRender,{validation:'No email address was given',validateSignIn:'',
                  headerData,url,adminValidator:'No email address was given',loggedIn,id,profileLoaded,surname,firstName})
                }
                 return res.render(failureRender,{validation:err.message,validateSignIn:'',
                 headerData,url,adminValidator:err.message,loggedIn,id,profileLoaded,surname,firstName}) 
                }

            if(req.body.admin){
              return res.render('adminStatusMessage',{status:'New Admin Registered',adminRedirect:`/adminRedirect/${id}`})
            }    
          passport.authenticate('local',{successRedirect,failureRedirect})(req,res)
    })

})

router.post('/signIn',(req,res)=>{

    const username = req.body.username
    const password = req.body.password
    const user = new User({username,password})

   
    req.logIn(user,function(err){
        if(err){
             return console.log('error in login attempt',err.message)
         }

         passport.authenticate('local',{successRedirect:`/blog`,failureRedirect:`/signInFailure`})(req,res)
  }) 
    
})

router.get('/signOut',(req,res)=>{

  req.logout()
  res.redirect('/signIn')
})

module.exports = router