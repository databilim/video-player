const file = require('../model/Video.js');
require('dotenv').config()

module.exports = (req,res,next)=>{
    let usersor;  
    if(req.user == undefined){
        usersor = process.env.USER_ID
       
      }else{
        usersor = req.user.id
        
      }
        const promise = file.find({userId:usersor});

            promise.then((data)=>{

                
                if(data==null){

                    req.video = null
                }else{
                    req.video = data
                }
              next()
            }).catch((err) => {
                console.log(err)
            })
}


