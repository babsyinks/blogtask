const express = require('express')
const bodyParser = require('body-parser') 
const router = express.Router()
const {BlogPost,User} = require('../model/model')
const auth = require('../middlewares/userAuth')
const dateTime = require('../postedDateTime')
const{signOut} = require('../links')
router.use(bodyParser.urlencoded({extended:true}))
router.use(express.static('public'))

router.get('/',auth,(req,res)=>{
    let currentSkip = +req.query.skip
    currentSkip = Number.isNaN(currentSkip)?0:currentSkip
   
        BlogPost.find()
        .skip(currentSkip)
        .limit(10)
        .exec(function(err,posts){ 
            if(err){
                return console.log(err)
            }
            if(posts.length === 0){
                const postArray = [{title:'Lunar Eclipse',content:'sdsfcsag dadadadgah dgshdgsdg fdfsdf dsdsda sasas \
                sadasa ssdsdsd  dsdsad e dfsds d f dfs ds d f f f fffff ffffs asad r yut i ko oi uu uju i iiiiiyi iid\
                asadh fhfhf jfksdh gdbcd bcjacl dcylasyd fsaene rmtgsfd,ughmsg hsdulg mlfs dgfcsg bmsdf gsd,fsdf dsfhdg fugh fg hkdf\
                h sdsa fh dgfysf herur eldkf hulew fdfgas fmdaf yadsb fye af afh udie ladaf refrhfld afhu dlusg hy rlewg lwergn fjlgs hcgg\
                hs atdgr hfasd jqwrs gfjdw afyw ergk gfye wauk jdfh kye fgdwy fksa ifw efgy efgy udji fygwe ryhf rule wfh dufkg wfue rfh fff\
                fdtg shd qjrt gjwtf djwefdk wghe giohde gkd ghk oghod werg hkd8werg hweod hlhdlw godhw fgodwe fdhwe rof hdk wwderoh wehghg',
                datePosted:new Date().toDateString()},
                
                {title:'Journal Writing',
                 content:'qwe erer t tjerw jgfj rfk fjfg jfjg djf  gjgj gjgjg sfdj ndf jdfg  gjgj dskl gjf gjf gjgjg asdj fdf\
                 dsfs fdfj gjg gjgj gjg gjgj gklsps lsdmnbbv  sdfjsa znsbd dnff ffn duf dfjdf djf dfjdnf gngng jgjgjg kgdeq wejr\
                 dyaDG YS GDY SDYSG DBSA KhgSGHD YEKR FHWEJh slafjd hfd lhwf hulghu lgifjgfh;oi fudldg huflshgh fgfjhggh ghg hgh ghghg\
                 fgd sajh dgkf yhydsh gdhgkf dhslgujf ghlsgh fuls gfhgod uijg ldjhdfl ijhk gjh ghjfjhkg jhkh glhug dhhh hhdj ljk jkjljlj\
                 as yfih dfjis gui dwy kg hey htg  udtgoer  tge rjt hfuo g8 erhg fko egogo gog ohg oerjo ghertg dhigkfj gkfjgkfjg kfgjf kjg gjg\
                 gfsdh fgy hegy egfyrg tgrfgryfg yrfgyro dkftu hgkhj lrhjrgy hruh lfer ughfe ordgef geh gdtfe dtlkf efheul rguet rhgtur',
                 datePosted:new Date().toDateString()},
                {title:'Book Keeping', 
                 content:'sds fgd gjg jgjg  wewe hguydsfg gf gdjsfng sjfn sjfnsj fng gjd fgjsfjsfi gjfgjdf so asj djhf jfjf we\
                 sdh hfh fsjf fhg s fjsfhf f jgjgjkg f njsfksf  gjgj gjg s fjsj fjfjf gjw ueu etg jsfj sadk gjsf hsfnng sadbaf jgig\
                 dyaD GYS DYSG DBSA KhgSGH DYEKR FHW EJhsla fjdh fdl hwfuhul ghul gifjg fh;oi fudl dgh uflshg hfgfj hgghgh ghghg hghg\
                 fgdsa jhdgk fyhy dshgdhg kfdhslguj fghls ghful sgf hgodui gldjh dflijhk gjhg jfjhkg jhkhgl hugdh hhhh djljkj kjljlj\
                 asyf ihdf jisg uidw ykghe yhtg udtgoer tgerj thfuoig 8erhgfkoe gogogo gohgo erjogher tgdhigkf jgkfjgkf jgkfgjfk jggjg\
                 sdhsa gfhdg fhd etiu fkheo gfut rgoeuh gfeg uilje gjiutj gupoppp pedowfj l;wgp tupjpe iiiii ikiej hiep fgjfe ird pjjfff',
                datePosted:new Date().toDateString()}]
    
                postArray.forEach((obj,i)=>{
                    const blogPost = new BlogPost({
                        title:obj.title,
                        content:obj.content,
                        datePosted:obj.datePosted,
                        
                })  
                blogPost.save(err=>{
                    if(err){
                      console.log(err)  
                    }
                    if(i===2){
                   res.redirect('/blog') 
                } 
    
                })

               
                })
               
            }
            else{
                BlogPost.countDocuments(function(err,count){
                    if(err){
                        return err.message
                    }
                     let pages = Math.floor(count/10)

                     if(count%10 !== 0){
                        pages+=1 
                     }

                     let nextSkip = currentSkip + 10
                     nextSkip = nextSkip>count?currentSkip:nextSkip
                     let prevSkip = currentSkip - 10
                     prevSkip = prevSkip<0?0:prevSkip
                     const profileLoaded = req.user.getImageBufferLength()
                     const{surname,firstName} = req.user.profile
                res.render('blog',{posts,pages,prevSkip,nextSkip,headerData:signOut.headerData,url:signOut.url,loggedIn:'loggedIn',id:req.user._id,profileLoaded,surname,firstName})
                }) 
              
            }
            
        }) 
    
})

router.get('/:id',auth, (req,res)=>{
            const{surname,firstName} = req.user.profile
            const profileLoaded = req.user.getImageBufferLength()
            let commentArr = []
            BlogPost.findById(req.params.id)
            .then(post=>{                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
                    if(post.comments.length > 0 && profileLoaded === 'loaded'){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
                            post.comments.forEach(async (comment,i)=>{


                      const user = await User.findById(comment.commentBy)
                                
                       commentArr.push({ 
                         comment:comment.comment, 
                         commentBy:comment.commentBy,
                         posted:dateTime(comment.posted),
                         postedBy:`${user.profile.surname} ${user.profile.firstName}`,
                         secondPosted:comment.posted.getTime()/1000
                        })

                        if(commentArr.length === post.comments.length){
                            
                            let commentArray = commentArr.sort((a,b)=>b.secondPosted - a.secondPosted)
                           return res.render('viewPost',{post, commentArray, headerData:signOut.headerData,url:signOut.url,loggedIn:'loggedIn',id:req.user._id,profileLoaded,surname,firstName})
                         }
                    
                   })
                           
                    }
                   else{
                       res.render('viewPost',{post, commentArr, headerData:signOut.headerData,url:signOut.url,loggedIn:'loggedIn',id:req.user._id,profileLoaded,surname,firstName})
                   }
                           
            })
            .catch(err=>console.log(err.message))
                         
})

router.post('/comment',auth,async (req,res)=>{
    const id = req.user._id
    const {comment,post_id} = req.body
   if(!comment){
       return res.redirect(`/blog/${post_id}`)
   }
    try{
        const post = await BlogPost.findById(post_id)
        post.comments.push({
           commentBy:id,
           comment,
           posted:new Date()
        })

        await post.save()
        res.redirect(`/blog/${post_id}`)
    }catch(e){
        console.log(e.message)
    }
    

})

module.exports = router