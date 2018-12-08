var express = require('express');
var router = express.Router();
const fs = require('fs');
const sharp = require('sharp');
 
const GenelAyar = require("../model/GenelAyar")

var loggedin = function (req, res, next) {
    if (req.isAuthenticated()) {
      next()
    } else {
      res.redirect('/login')
    }
  }


router.post("/logoYukle",loggedin,(req,res)=>{
    // GENEL AYAR LOGO EKLE 
    let files = req.files.file
    let fileName = randomSayi(1,9999999)+"_"+files.name;
    let serverFile = "public/upload/"+fileName;
    sharp(req.files.file.data)
      .resize(100)
      .toFile(serverFile, (err, info) => {
          if(err){
            console.log(err)
          }else{

            req.body.logo = fileName
            
            var promise = GenelAyar.findOne({userId:req.body.userId})
                promise.then((genel)=>{
                  // Kullanıcıya Ait id genel ayar yoksa 
                  if(genel== null){ 
                     
                    const genelayar = new GenelAyar(req.body);
                    const gpromise = genelayar.save();
                    gpromise.then((gdata)=>{
                        res.json({status:1,message:"Kullanıcı :"+gdata.userId + " Genel Ayar Oluştruldu "})
                    }).catch((gerr)=>{
                        console.log("KULLANCI ID Lİ AYAR yok");
                        res.json({status:0,message:gerr})
                    })
                  }else{
                    console.log("KULLANCI ID Lİ AYAR VAR ",genel.userId, req.body.userId)

                     var gcpromise = GenelAyar.findByIdAndUpdate(
                         genel._id,
                         req.body,
                         {
                             new:true
                         }
                     );

                     gcpromise.then((gcdata)=>{

                        res.json({status:1,message:" FOTO LOGO Güncellenid"})

                     }).catch((cerr)=>{

                        res.json({status:0,message:"Foto guncellenemedi",cerr})
                     })
                  }
                   
                }).catch((err)=>{

                    res.json(err)
                })

         
         /*
            const genelayar = new GenelAyar(req.body);
            const promise = genelayar.save()
         
            promise.then((ayar)=>{

            res.json({status:1})
              }).catch((err)=>{

                  res.json({error:err, code:5})
              })
           */
          }

      } );
      
     
})





function randomSayi(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  
  module.exports = router;