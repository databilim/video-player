var express = require('express');
var router = express.Router();
const fs = require('fs');
const sharp = require('sharp');
const Video = require("../model/Video")
const GenelAyar = require("../model/GenelAyar")
var loggedin = function (req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/login')
  }
}

/* GET home page. */
router.get('/', function (req, res, next) {
 
  res.render('index',
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
 
  
});


router.get('/login', function (req, res, next) {
  res.render('admin/login');
});


router.get('/signup', function (req, res, next) {
  res.render('signup');
});


router.get('/profile', loggedin, function (req, res, next) {
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
  )
});


router.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
})



router.get('/video/:video_id', function(req, res) {
  console.log("data.file")
  const promise = Video.findById(req.params.video_id);
    promise.then((data) => {
      
    if((data.type=="video/mp4") || (data.type=="video/quicktime")){
          const path = './public/upload/'+data.file;
          const stat = fs.statSync(path)
          const fileSize = stat.size

          console.log("DOSYA BUYUKLÜĞÜ",fileSize)
          const range = req.headers.range
          if (range) {
            const parts = range.replace(/bytes=/, "").split("-")
            const start = parseInt(parts[0], 10)
            const end = parts[1] 
              ? parseInt(parts[1], 10)
              : fileSize-1
            const chunksize = (end-start)+1
            const file = fs.createReadStream(path, {start, end})
            const head = {
              'Content-Range': `bytes ${start}-${end}/${fileSize}`,
              'Accept-Ranges': 'bytes',
              'Content-Length': chunksize,
              'Content-Type': 'video/mp4',
            }
            res.writeHead(206, head);
            file.pipe(res);
          } else {
            const head = {
              'Content-Length': fileSize,
              'Content-Type': 'video/mp4',
            }
            res.writeHead(200, head)
            fs.createReadStream(path).pipe(res)
          } 

    }
   

    }).catch((err) => {
      res.json(err);
    })


});

router.get('/api/video',(req,res,next)=>{

  
  //res.send(req.body)
  
  const promise = Video.find()
   //req.io.emit("checkin",req.body.checkin)
   promise.then((video)=>{

    res.json(video)
      }).catch((err)=>{

          res.json({error:err, code:5})
      })
})
router.post('/videoekle',loggedin,(req,res,next)=>{
  let files = req.files.file
  let fileName = randomSayi(1,9999999)+"_"+files.name;
  let serverFile = "public/upload/"+fileName;
    files.mv(serverFile,(err)=>{
    if(err){
      return res.status(500).send(err);
    }
        

    //res.send('File uploaded!');

    })
 
    req.body.file = fileName
    const video = new Video(req.body);
    const promise = video.save()
   //req.io.emit("checkin",req.body.checkin)
    promise.then((video)=>{

    res.json({status:1})
      }).catch((err)=>{

          res.json({error:err, code:5})
      })
})







function randomSayi(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


module.exports = router;