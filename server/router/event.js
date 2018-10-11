var express = require('express');
var router = express.Router();
var Event=require('../models/event')
const {auth}=require('../middleware/auth.js')
const authorize=require('../middleware/authorize.js').isMe

router.post('/',auth,function(req,res){
    let newEvent = {    
        name:req.body.name,
        location: req.body.location,
        adress:req.body.adress,
        user:req.decoded.id
    }

    Event.create(newEvent)
        .then((data) => {
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(500).json({error: err.message})
        })
    })

router.get('/',function(req,res){
    Event.find()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({error: err.message})
            })
})

router.get('/detail',function(req,res){
    Event.find().populate('user')
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({error: err.message})
            })
})

router.get('/search/:keyword',function(req,res){
    Event.find({name: new RegExp(req.params.keyword, 'i')})
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({error: err.message})
            })
})

router.get('/:id',function(req,res){
    Event.find({_id:req.params.id}).populate('user')
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({error: err.message})
            })
    })

router.post('/:id',auth,function(req,res){
        Event.updateOne({_id: req.params.id}, {$pull: {likes: req.decoded.id}})
            .then(() => {
                Event.updateOne({_id: req.params.id}, {$push: {likes: req.decoded.id}})
                    .then(() => {
                        res.status(201).json({message: 'You just like this event!'})
                    })
                    .catch(err => {
                        res.status(500).json({error: err.message})
                    })
            })
            .catch(err => {
                res.status(500).json({error: err.message})
            })
})

router.delete('/:id',auth,authorize,function(req,res){  
    Event.deleteOne({_id: req.params.id})
    .then(() => {
        res.status(200).json({success:true,message:`Event with id ${req.params.id} deleted`})
    })
    .catch(err => {
        res.status(500).json({error: err.message})
    })
})


module.exports=router