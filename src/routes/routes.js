const express = require('express')
const db = require('mongoose')
const router = express.Router()
const randomNum = require('../modules/randomNum')
const multer = require('multer')
const cookieParser = require('cookie-parser')
const User = require('../database/models/users')
const Questions = require('../database/models/questions')
const upload = multer({dest: '../uploads'})
const path = require('path')
const { json } = require('express')

router.use(cookieParser())


router.get('/', (req, res) => {
    res.clearCookie("user", { path: '/' })
    res.sendFile(path.resolve('src/public/index.html'))
})

router.post('/login', upload.none(), async (req, res, next) => {
    let {username, userpass} = req.body
    let user = await User.findOne({name: username, pin: userpass})
    if(user){
        console.log(user.name)
        console.log(user.score)
        res.cookie('user', user.name)
        res.cookie('score', user.score)
        res.json({name: user.name})
    }
    else{
        res.json({refused: true, error: "Sus credenciales de inicio de sesión no son correctas"})
    }
    })

router.get('/login', (req, res) => {
    console.log(req.cookies)
    res.sendFile(path.resolve('src/public/home.html'))
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
            res.json({refused: true, error: 'There was an error'})
        }
        
    }
    })

router.post('/eval', upload.none(), async (req, res) => {
    if(req.cookies.user){
        if(req.body.level === "starting"){
            let data = await Questions.findOne({category:"min", questionId: randomNum()})
            res.json({data: data, userdata: {user: req.cookies.user, score: req.cookies.score}, score: 100})
        }
        else if(req.body.level === "min"){
            let data = await Questions.findOne({category:"min", questionId: req.body.questionId})
            if(req.body.answer === data.correct){
                let data = await Questions.findOne({category:"low", questionId: randomNum()})
                res.json({data: data, score: 300})
            }
            else{
                res.json({refused: true, error: 'respuesta erronea'})
            }
       
        }
        else if(req.body.level === "low"){
            let data = await Questions.findOne({category:"low", questionId: req.body.questionId})
            if(req.body.answer === data.correct){
                let data = await Questions.findOne({category:"medium", questionId: randomNum()})
                res.json({data: data, score: 500})
            }
            else{
                res.json({refused: true, error: 'respuesta erronea'})
            }
       
        }
        else if(req.body.level === "medium"){
            let data = await Questions.findOne({category:"medium", questionId: req.body.questionId})
            if(req.body.answer === data.correct){
                let data = await Questions.findOne({category:"high", questionId: randomNum()})
                res.json({data: data, score: 700})
            }
            else{
                res.json({refused: true, error: 'respuesta erronea'})
            }
       
        }
        else if(req.body.level === "high"){
            let data = await Questions.findOne({category:"high", questionId: req.body.questionId})
            if(req.body.answer === data.correct){
                let data = await Questions.findOne({category:"max", questionId: randomNum()})
                res.json({data: data, score: 900})
            }
            else{
                res.json({refused: true, error: 'respuesta erronea'})
            }
       
        }
        else if(req.body.level === "max"){
            let data = await Questions.findOne({category:"max", questionId: req.body.questionId})
            if(req.body.answer === data.correct){
                let data = await Questions.findOne({category:"max", questionId: randomNum()})
                res.json({data: data, score: 1100})
            }
            else{
                res.json({refused: true, error: 'respuesta erronea'})
            }
       
        }
        else{
            res.redirect('/') 
        }
        
    }
    else{
        res.redirect('/')
    }
    
})

module.exports = router