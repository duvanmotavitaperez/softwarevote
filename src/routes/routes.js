const express = require('express')
const db = require('mongoose')
const router = express.Router()
const multer = require('multer')
const User = require('../database/models/users')
const upload = multer({dest: '../uploads'})
const path = require('path')
const { useState } = require('react')

router.get('/', (req, res) => {
    res.sendFile(path.resolve('src/public/index.html'))
    console.log('test two')
})
router.post('/login', upload.none(), async (req, res, next) => {

    let {username, userpass} = req.body
    let addUser = new User({name: username, pin: userpass, score: 0, level: "PRINCIPIANTE"})
    let verifyUser = await User.findOne({name: username, pin: userpass})
    if(verifyUser){
        res.json({refused: true, error: ""})
    }
    else{
        try{
            addUser.save()
            res.json({conf: 'register success'})
        }
        catch(e){
            console.log(e)
            res.json({conf: 'There was an error'})
        }
        
    }
    })
router.post('/register', upload.none(), async (req, res, next) => {

    let {username, userpass} = req.body
    let addUser = new User({name: username, pin: userpass, score: 0, level: "PRINCIPIANTE"})
    let verifyUser = await User.findOne({name: username})
    if(verifyUser){
        res.json({refused: true, error: "The user has already exist, please try again"})
    }
    else{
        try{
            addUser.save()
            res.json({conf: 'register success'})
        }
        catch(e){
            console.log(e)
            res.json({conf: 'There was an error'})
        }
        
    }
    })
module.exports = router