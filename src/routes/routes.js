const express = require('express')
const db = require('mongoose')
const router = express.Router()
const multer = require('multer')
const cookieParser = require('cookie-parser')
const User = require('../database/models/users')
const upload = multer({dest: '../uploads'})
const path = require('path')

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
        res.cookie('user', user.name)
        res.json({name: user.name})
    }
    else{
        res.json({refused: true, error: "Sus credenciales de inicio de sesión no son correctas"})
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
module.exports = router