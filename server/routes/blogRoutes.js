const express = require('express')
const bodyParser = require('body-parser') 
const router = express.Router()
const {BlogPost,User} = require('../model/model')
const auth = require('../middlewares/userAuth')
const dateTime = require('../postedDateTime')
const{signOut} = require('../links')
const publicDir = process.env.NODE_ENV === 'production'?'build':'public'
router.use(bodyParser.urlencoded({extended:true}))
router.use(express.static(`${publicDir}`))

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
                const postArray = [{title:'Doing Fly Control With Ease',
                content:`House flies, whose life cycle can span from 1 week to 2 months, can be controlled by best practices of sanitation, physical exclusion and by least toxic, chemical and non-chemical measures. Understanding their habits and life cycle can help you eliminate the most flies at the lowest cost to you and the environment.

                House Fly is gray to grayish-black in color, and about 1/6 to 1/4 inch in length. The female is usually larger than the male. When it is not feeding, the House fly can be found resting on ceilings, walls, and floors during daylight hours. At night, House flies rest mainly on ceilings and electric cords within 15 feet of a daytime feeding source.
            
                Sanitation
                Limited food sources means limited breeding so do not allow materials such as manure, garbage or compost to accumulate. Keep trash cans clean and tightly covered.
                
                Sanitation is key to house fly control. You can use all the sprays and traps in the world to get rid of house flies, but you must eliminate the breeding/feeding sources of the pest in order to completely eliminate the pest.
                
                Keep trash in a receptacle with a tight-fitting lid.
                Clean trash receptacles regularly and always use plastic liners.
                Promptly dispose of rotting produce.
                Inspect areas under and behind appliances for hidden food spills that may be attracting the flies.
                Clean under floor mats regularly.
                Physical Exclusion.
                Ensure that window and door screens are tightly fitting and have no holes or rips. Adjust hinges and apply weather stripping to make sure there are no openings at the top or bottom of exterior doors. Seal any utility service openings at building entry points with caulk or metal flashing. Screen ventilation ports with fine aluminum or nylon mesh.
                
                You will find that fewer House flies and fewer pests in general will find their way into your home if you will only make it more difficult for them to enter.
                
                Doors leading to the outside should be equipped with self-closing devices or a screen door.
                Keep window and door screens in good repair, without tears or holes.
                Make sure that all doors fit tightly within their frames, with intact weather-stripping.
                Any cracks or gaps around windows and doors should be caulked.
                
                Chemicals:
                It may take several weeks for sanitation measures and other methods of House Fly control to achieve complete elimination. In the meantime, a contact aerosol or a space spray may be used for quick kill of flying adults present in the surrounding area.
                
                Least Toxic Measures:
                Ultraviolet-light and electrocution traps, sticky fly traps and carnivorous plants will eliminate many house pests. Keep a fly swatter handy for the occasional fly.
                `,
                datePosted:new Date().toDateString()},
                {title:'Getting Out of Trouble with Carpet Dirt Build Up',
                 content:`Dirt is not a difficult problem but if you let it build up for a while or worse for a much longer time, no one can tell if you can still remove it unless you call the experts to do it for you.
                 Carpet dirt is the same story thus it is good to do away with it or else you need not do it yourself.The faster you act the more likely you'll be successful removing a carpet stain and dirts.
                 Speed can also prevent a stain from appearing in the first place. Once you notice a blemish, move quickly.While vacuuming on a regular basis will keep your carpet from looking dingy and dirty,
                 tough stains are something that even the new of best vacuum can't handle. Whatever the problem, there's a specific solution or carpet cleaning product to make your area look brand-new.
                 Vacuum slowly enough to get out as much dirt as possible. Make one quick pass over low-traffic areas and two slow passes over high-traffic areas. Two slow passes removes ground-in dirt more effectively than several fast passes.
                 Dirt is like thousands of little blades that cut carpet fibers. When you walk across a dirty carpet, you grind sharp dirt particles against the yarn, making tiny nicks in the fibers.
                 All that fuzz mixed in with the dirt in your vacuum cleaner bags is your beautiful carpet headed out the door one bag at a time. When dirt scratches the fibers, it dulls the sheen, which is why high-traffic areas appear duller than the rest of the carpet.
                 Over time, grinding dirt wears away the fibers too, which mats them down and makes them stain more easily.Most carpet manufacturers recommend professional hot water extraction as the primary cleaning method for synthetic carpets.
                 Although it’s often referred to as “steam” cleaning, there’s no steam involved. The carpet is pretreated with a detergent solution, and then a very hot rinse solution under high pressure is forced into your carpet and vacuumed out. When done correctly,
                 this process cleans deep and doesn’t leave behind a soap residue.Call a professional to rid your carpet of ground-in dirt if you cannot do so yourself. They have more powerful equipment and carpet cleaner solutions than what is available for purchase or rent to the general public.`,
                 datePosted:new Date().toDateString()},
                {title:'Finding Success in Ant Control Targeting Sugar Ants', 
                 content:`Of course, you may spray them with insecticide and become satisfied seeing those creatures dead on your counters. But is it your best choice for fighting with sugar ants?
                 Sugar ants are known to be small invaders, which can get into any home through the tiniest cracks.They love sweets but will eat anything. They are hazardous as they can contaminate food and spread salmonella. There are horror stories of sugar ants infesting nursing homes and hospitals.
                 Modern baits combine favourite ant food and active ingredients killing them afterwards. So, why not help ants bring a meal back and share it with the colony? As a result, you won't even see those which die as well. By the way, mint jelly and boric acid are considered to be the ideal bait ever.
                 Most recommended was the Borax treatment. Borax is fatal to ants but not humans. Borax is a clothes washing product found in the detergent section of the store.
                 Recipes for the borax mixture include: 1 cup water, 2 cups sugar mixed with 2TB borax sprinkled around. The ants bring the mixture back to their nests, which slowly kills the other ants.
                 Another concoction is 1 ½ TB of borax mixed with 1TB mayonnaise, spread around. Keep all these mixtures away from children and pets.
                 White vinegar spray is also effective. In fact after using the first borax treatment and spraying and wiping the surfaces with white vinegar, the sugar ants seem to be gone.Real Score: why not start from keeping your kitchen cleanand dry? The point is that ants simply love dirty sink and water.
                 So, rinse out dishes left in the sink overnight, and wipe down the entire sink, for no residual sweets, food and moisture. Also, you may pour a little bleach down the drain, in order to remove the smell of rotting food.
                 Moreover, sugar ants like dirty countertops too. Believe that a few crystals of sugar spilled from the morning coffee cup can feed an entire colony of ants right the next morning. Therefore, sanitize your kitchen and break down the pheromones following the food sources.
                 Sweep and mop the kitchen floor every day during summer. You may use warm water and bleach to get rid of food scraps and residual sugars.   Speaking of natural ways of ant controls and on how to kill sugar ants, white vinegar for cleaning surfaces is an alternative, instead of bleach cleaners.
                 No doubt that strong odor of vinegar will detract ants. Besides, acetic acid in vinegar works wonders as a cleaning agent, being as effective as bleach solution. One more good way is to repel insects with whole cloves. This can drive away ants due to their senses.
                 Place this spice either along baseboards or under windows. Also, think of bay leaves, which are a natural deterrent for ant insects. FinallyPsychology Articles, use boiling water for pouring it right into ant colony. This will definitely end the ants disturbance in your home.
                 Go to main page Ant Control Auckland for more tips and details of assistance.`,
                datePosted:new Date().toDateString()}]
    
                postArray.forEach((obj,i)=>{
                    const blogPost = new BlogPost({
                        title:obj.title,
                        content:obj.content,
                        datePosted:obj.datePosted,
                })  
                blogPost.save(err=>{
                    if(err){
                      return console.log(err)  
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
                            post.comments.forEach(async (comment)=>{
                      const user = await User.findById(comment.commentBy)
                       commentArr.push({
                         _id:comment._id,
                         comment:comment.comment, 
                         commentBy:comment.commentBy,
                         posted:dateTime(comment.posted),
                         postedBy:user?`${user.profile.surname} ${user.profile.firstName}`:'Deleted User',
                         secondPosted:comment.posted.getTime()/1000,
                         user,
                         likes:comment.likes.length,
                         unLikes:comment.unLikes.length,
                        }) 
 
                        if(commentArr.length === post.comments.length){
                            
                            let commentArray = commentArr.sort((a,b)=>b.secondPosted - a.secondPosted)
                           return res.render('viewPost',{user,post, commentArray, headerData:signOut.headerData,url:signOut.url,loggedIn:'loggedIn',id:req.user._id,profileLoaded,surname,firstName})
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
       return console.log(e.message)
    }
    
})

router.get('/likeOrUnlike/:postId/:commentId/:status',auth,async (req,res)=>{
    
    try{
        const post = await BlogPost.findById(req.params.postId)
        const commentToLikeOrUnlike = post.comments.find((comment)=>comment._id.equals(req.params.commentId))
        const findLikedOrUnliked = (id)=>id.equals(req.user._id)
        if(req.params.status === 'like'){
            const alreadyLiked = commentToLikeOrUnlike.likes.find(findLikedOrUnliked)
            if(!alreadyLiked){
                commentToLikeOrUnlike.likes.push(req.user._id)
                const indexOfLike = commentToLikeOrUnlike.unLikes.findIndex(findLikedOrUnliked)
                if(indexOfLike!==-1){
                   commentToLikeOrUnlike.unLikes.splice(indexOfLike,1) 
                } 
            }
            else{
                const indexOfLike = commentToLikeOrUnlike.likes.findIndex(findLikedOrUnliked)
                commentToLikeOrUnlike.likes.splice(indexOfLike,1)  
            }
        }    
        else if(req.params.status === 'unLike'){
            const alreadyUnliked = commentToLikeOrUnlike.unLikes.find(findLikedOrUnliked)
            if(!alreadyUnliked){
                commentToLikeOrUnlike.unLikes.push(req.user._id)
                const indexOfUnlike = commentToLikeOrUnlike.likes.findIndex(findLikedOrUnliked)
                if(indexOfUnlike!==-1){
                   commentToLikeOrUnlike.likes.splice(indexOfUnlike,1) 
                }
            }
            else{
                const indexOfUnlike = commentToLikeOrUnlike.unLikes.findIndex(findLikedOrUnliked)
                commentToLikeOrUnlike.unLikes.splice(indexOfUnlike,1) 
            }
        }
        else{
            return
        }
        
        await post.save()
        res.redirect(`/blog/${req.params.postId}`)
    }catch(e){
      return console.log(e.message)
    }
})

module.exports = router