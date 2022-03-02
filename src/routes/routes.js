const path = require('path')
const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({dest: '../uploads'})
const cookieParser = require('cookie-parser')
const User = require('../database/models/users')
const evalQuestion = require('../modules/evalQuestion')
const saveData = require('../modules/saveUserData')


router.use(cookieParser())

router.get('/', (req, res) => {
    res.clearCookie("user", { path: '/' })
    res.clearCookie("score", { path: '/' })
    res.clearCookie("end", { path: '/' })
    res.sendFile(path.resolve('src/public/index.html'))
})

router.post('/login', upload.none(), async (req, res, next) => {
    let {username, userpass} = req.body
    let user = await User.findOne({name: username, pin: userpass})
    if(user){
        res.cookie('user', user.name)
        res.cookie('score', user.score)
        res.json({name: user.name})
    }
    else{
        res.json({refused: true, error: "Sus credenciales de inicio de sesión no son correctas"})
    }
    })

router.get('/login', (req, res) => {
    if(req.cookies.user){
        res.sendFile(path.resolve('src/public/home.html'))
    }
    else{
        res.redirect('/')
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
            res.json({refused: true, error: 'There was an error'})
        }
        
    }
})

router.post('/eval', upload.none(), async (req, res) => {
    if(req.cookies.user){
        const question = await evalQuestion(req.body, req.cookies)
        if(question.end){
            res.cookie('end', true)
            res.json(question)
        }
        else{
             res.json(question)
        }
    }
    else{
        res.redirect('/')
    }
    
})

router.post('/savedata', upload.none(), async (req, res) => {
        if(req.cookies.user){
            let conf = await saveData(req.body.score, req.cookies.user)
            if(conf.saved){
                res.cookie('score', conf.score)
                res.json({conf: true})
            }
            else{
                res.json({conf: false})
            }
            
        }
        
})

router.get('/finish', upload.none(), (req, res) => {
    if(req.cookies.user){
        res.sendFile(path.resolve('src/public/gameOver.html'))
    }
    else{
        res.redirect('/')
    }
    
})

router.get('/winner', upload.none(), (req, res) => {
    if(req.cookies.end){
        res.sendFile(path.resolve('src/public/winner.html'))
    }
    else{
        res.redirect('/')
    }
    
})
module.exports = router