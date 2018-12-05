var express = require('express');
var router = express.Router();
const fs = require('fs');
var url = require('url');
const VideoCount = require("../model/VideoCount");
var loggedin = function (req, res, next) {
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
    res.render('admin/index', { video: req.video , swarm:req.checkin,path: req.path});
    //res.render('index')
      console.log("CELLO",req.url)
});
  
router.get('/videoekle',loggedin,  (req, res, next)=> {
    res.render('admin/index', { video: req.video , swarm:req.checkin,path: req.path});
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



module.exports = router;
