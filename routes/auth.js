var express = require('express');
var router = express.Router();
var User = require('../model/User');
var GenelAyar = require('../model/GenelAyar');
var VideoCount = require('../model/VideoCount');

/* GET home page. */


module.exports = function (passport) {
    router.post('/signup', function (req, res) {
        var body = req.body,
            username = body.username,
            password = body.password;
            fullname = body.fullname;
        User.findOne({
            username: username
        }, function (err, doc) {
            if (err) {
                res.status(500).send('error occured')
            } else {
                if (doc) {
                    res.status(500).send('Username already exists')
                } else {
                    var record = new User()
                    record.fullname = fullname; 
                    record.username = username;
                    record.password = record.hashPassword(password)
                    console.log(record)
                    record.save(function (err, user) {
                        if (err) {
                            res.status(500).send(err)
                        } else {

                            const GenelAyarEkle = new GenelAyar(
                                {
                                    logo:"",
                                    userId:record._id
                                }
                            )
                           const GaPromise = GenelAyarEkle.save();
                           GaPromise.then((gaData)=>{
                                console.log(gaData)
                                
                           }).catch((err)=>{
                                console.log({status:0,message:"Genel ayar Eklenemedi",err:err})
                           })     

                           const VideoCountEkle = new VideoCount(
                               {
                                   userId:record._id,
                                   say:0
                               }
                           )
                           const VcPromise = VideoCountEkle.save()
                           VcPromise.then((data)=>{

                                console.log(data)
                           }).catch((err)=>{
                                console.log(err)
                           })


                            res.redirect('/login')
                        }
                    })
                }
            }
        })
    });


    router.post('/login', passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/profile',
    }), function (req, res) {
        res.send('hey')
    })
    return router;
};