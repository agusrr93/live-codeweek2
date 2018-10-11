var express = require('express');
var router = express.Router();

var User=require('../models/user')
const encrypt = require('../helpers/encrypt')
const jwt=require('jsonwebtoken')
const {auth}=require('../middleware/auth.js')


router.post('/register',function(req,res){
    let newUser = {
        name: req.body.name,
        email: req.body.email,
        password:req.body.password
    }

    User.create(newUser)
        .then((data) => {
            res.status(201).json({success:true,
                message:`Account ${newUser.name} registered`}
            )
        })
        .catch(err => {
            res.status(500).json({error: err.message})
        })
})

router.post('/login', function(req,res){
    let hashed = encrypt.hashPassword(req.body.password, req.body.email)
    User.findOne({email: req.body.email, password: hashed})
        .then(user => {
            let obj = {
                id: user._id,
                name: user.name,
                email: user.email
            }
            jwt.sign(obj,process.env.JWT_SECRET, (err, token) => {
                if (err) {
                    res.status(500).json(err)
                } else {
                    res.status(200).json({token:token})
                }
            })
        })
        .catch(err => {
            res.status(500).json({error: err.message})
        })
})


router.get('/',auth,function(req,res){
    User.find()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                
                res.status(500).json({error: err.message})
            })
})

router.get('/profile',auth,function(req,res){
    res.status(200).json(req.decoded)
})

router.delete('/',function(req,res){
    User.remove({})
    .then(() => {
        res.status(200).json({message: 'All User deleted!'})
    })
    .catch(err => {
        res.status(500).json({error: err.message})
    })
})

module.exports=router