const GenelAyar = require('../model/GenelAyar');
require('dotenv').config()
//console.log(process.env.USER_ID)
module.exports = (req,res,next)=>{
    let usersor;  
    if(req.user == undefined){
        usersor = process.env.USER_ID
          console.log("USER BOŞ",usersor)
      }else{
        usersor = req.user.id
        console.log("GİRİŞ USER DOLU",usersor)
      }
        const promise = GenelAyar.findOne({userId:usersor});

            promise.then((data)=>{
                if(data==null){

                    req.GenelAyar = null
                }else{
                    req.GenelAyar = data
                }
                
                //console.log(data)
              next()
            }).catch((err) => {
                console.log("GENEL AYAR MİDDLEWARE ERR VERDİ")
                res.send("LİSANS AKTİF DEĞİL YADA GEÇERSİZ")
            })
}
