const GenelAyar = require('../model/GenelAyar');
require('dotenv').config()
//console.log(process.env.USER_ID)
module.exports = (req,res,next)=>{

        const promise = GenelAyar.findOne({userId:process.env.USER_ID});

            promise.then((data)=>{
                if(data==null){

                    req.GenelAyar = null
                }else{
                    req.GenelAyar = data
                }
                
                //console.log(data)
              next()
            }).catch((err) => {
                console.log(err)
            })
}
