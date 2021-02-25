
const mongoose = require('mongoose') 
const passportLocalMongoose = require('passport-local-mongoose')
const validator = require('validator')

mongoose.set("useCreateIndex", true);

const mongoose1 = require('../conn').mongoose1
//const mongoose2 = require('../conn').mongoose2

const findOrCreate = require('mongoose-findorcreate') 

const blogSchema = new mongoose.Schema({

    title:{
        type:String,
        unique:true,
        required:true,
        trim:true,
    },

    content:{
        type:String,
        required:true
    },

    datePosted:String,

    comments:{ 
        type:[{
            commentBy:{
                type:mongoose.Schema.Types.ObjectId,
            },
            comment:{
                type:String,
                trim:true,  
            },
            posted:Date,
            likes:{
                type:[mongoose.Schema.Types.ObjectId],
                default:[]
            },
            unLikes:{
                type:[mongoose.Schema.Types.ObjectId],
                default:[]
            }
        }],
        default:[]
    }
})

const profileSchema = new mongoose.Schema({
    surname:{
            type:{
            String,
            lowercase:true,
            trim:true,
            required:true}},
            
    firstName:{
        type:{
            String,
            lowercase:true,
            trim:true,
            required:true
        }
    },
    profilePic:{
                type:Buffer,
                default:''
            }

})

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email')
            }
        }
    },
    facebookId:String,
    role:{type:String,enum:['admin','guest']},
    profile:{
        type:profileSchema,
        default:{}
    }
})

const timerSchema = new mongoose.Schema({
    id:String,
    title:String,
    project:String,
    date:String,
    time:String,
    displayEdit:Boolean   
})
//expand schema with passport local mongoose
userSchema.plugin(passportLocalMongoose)

//expand schema with mongoose-findorcreate
userSchema.plugin(findOrCreate)

userSchema.methods.getImageBufferLength = function(){
    return this.profile.profilePic.toString().length?'loaded':''
}

const User = mongoose1.model('User',userSchema)

const BlogPost = mongoose1.model('Blog',blogSchema)

const Profile = mongoose1.model('Profile',profileSchema)

const Timer = mongoose1.model('TimerList',timerSchema)

module.exports = {User,BlogPost,Profile,Timer}