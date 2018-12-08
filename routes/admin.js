var express         = require('express');
var router          = express.Router();
const fs            = require('fs');
var url             = require('url');
const VideoCount    = require("../model/VideoCount");
const Video         = require("../model/Video")


var loggedin        = function (req, res, next) {
    if (req.isAuthenticated()) {
      next()
    } else {
      res.redirect('/login')
    }
  }

router.get('/', function(req, res, next) {
    //res.render('admin/index', { video: req.video , swarm:req.checkin,path: req.path});
    res.render('admin/login')
      console.log("CELLO",req.url)
  });

  router.get('/giris', function(req, res, next) {
    res.render('admin/index', { vuser: {user:req.user,id:req.user.id},video: req.video , swarm:req.checkin,path: req.path});
    //res.render('index')
      console.log("CELLO",req.url)
});
  
router.get('/videoekle',loggedin,  (req, res, next)=> {
    res.render('admin/index', { vuser: {user:req.user,id:req.user.id},video: req.video , swarm:req.checkin,path: req.path});
    console.log("CELLO",req.originalUrl)
});

router.post("/videoCount",(req,res,next)=>{
    const videoCountEkle    = new VideoCount(req.body)
    const promise           = videoCountEkle.save()
            promise.then((data)=>{
                res.json({status:1})
            }).catch((err)=>{

                res.json({error:err, code:5})
            }) 
            
})
router.get("/genelAyar",loggedin,(req,res,next)=>{
        console.log(req.user.id)
        //res.send("genel ayar")
        //res.render("/admin/genelayar")
        res.render('admin/index', 
        { 
            vuser:{
                user:req.user,
                id:req.id
                 },
                video: req.video ,
                swarm:req.checkin,
                path: req.path,
                genelayar:req.GenelAyar
          }
        );

})
router.post("/sil",loggedin,(req,res)=>{
    const id = req.body.id;
    const promise = Video.findById(id);
          promise.then((data)=>{

            console.log(data)
            Video.remove({_id:data._id},(err)=>{
                if(!err){
                    fs.unlinkSync('./public/upload/'+data.file)
                    res.json({status:1,message:"Silindi",id:id})
                }
            })


          }).catch((err)=>{

            res.json(err)

          })  
     
})





module.exports = router;
