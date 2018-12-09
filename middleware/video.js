const file = require('../model/Video.js');
require('dotenv').config()

module.exports = (req,res,next)=>{

        const promise = file.find({userId:process.env.USER_ID});

            promise.then((data)=>{

                req.video = data
             // console.log(data)
              next()
            }).catch((err) => {
                console.log(err)
            })
}


