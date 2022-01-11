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
        res.cookie('user', user.name)
        res.cookie('cat', user.category)
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

router.get('/min', upload.none(), async (req, res) => {
    if(req.cookies.user){
        let data = await Questions.findOne({category:"min", questionId: randomNum()})
        res.json(data)
    }
    else{
        res.redirect('/')
    }
    
}), 
router.get('/low', upload.none(), () => {

}), 
router.get('/high', upload.none(), () => {

}), 
router.get('/max', upload.none(), () => {

}), 

module.exports = router