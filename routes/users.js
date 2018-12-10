var express = require('express');
var router = express.Router();
const User = require("../model/User")
const bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/register', function(req, res, next) {
  res.render("admin/register")
})

router.post("/register",(req,res)=>{
  const {username,password,fullname}=req.body;
        bcrypt.hash(password, 10).then(function(hash) {
            // Store hash in your password DB.
            const user = new User({
                username,
                password : hash,
                fullname,
        
    
            }) 
           const promise = user.save()
           
           promise.then((data)=>{
               // res.json(data)
               res.redirect('/login') 
               console.log(data)
                //  res.redirect('/admin/login');
           }).catch((err)=>{
    
                res.json(err)
           })
        });
 

})


module.exports = router;
