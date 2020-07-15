const {signOut} = require('../links') 
const{User,passport} = require('../passaportLocal/passportLocal')
module.exports = function(req,res,next){
    if(req.isAuthenticated() && req.user.role === 'admin'){
        next()
}
else{
    User.findOne({username:'new@new.com'},(err,user)=>{
        if(!user){
             const user = new User({username:'new@new.com',role:'admin'})     
             User.register(user,'new@new.com',(err,user)=>{

                if (err) {
                    if(err.name === 'UserExistsError'){
                       return res.render('adminSignIn',{adminValidator:'Username already exist',headerData:signOut.headerData,url:signOut.url,loggedIn:''})
                    }
                    else if(err.message === 'No username was given'){
                      return res.render('adminSignIn',{adminValidator:'No email address was given',headerData:signOut.headerData,url:signOut.url,loggedIn:''})
                    }
                     return res.render('adminSignIn',{adminValidator:err.message,headerData:signOut.headerData,url:signOut.url,loggedIn:''}) 
                    }
              passport.authenticate('local',{successRedirect:'/admin',failureRedirect:'/adminSignIn'})(req,res)
        })  
        }
        else{
            res.render('adminSignIn',{adminValidator:'',headerData:signOut.headerData,url:signOut.url,validation:'',loggedIn:''})
        }

        
    })

    
}
}

