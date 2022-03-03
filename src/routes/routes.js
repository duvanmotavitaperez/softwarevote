const path = require('path')
const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({dest: '../uploads'})
const cookieParser = require('cookie-parser')
const User = require('../database/models/users')
const Sections = require('../database/models/sections')



router.use(cookieParser())

router.get('/', (req, res) => {
    res.clearCookie("user", { path: '/' })
    
    res.sendFile(path.resolve('src/public/index.html'))
})

router.post('/login', upload.none(), async (req, res, next) => {
    let {username, userpass, section} = req.body
    let user = await User.findOne({name: username, pin: userpass})
    if(user){
        res.cookie('user', user.name)
        res.cookie('section', user.section)
        res.json({name: user.name, section: section})
    }
    else{
        res.json({refused: true, error: "Sus credenciales de inicio de sesión no son correctas"})
    }
    })

router.get('/voter', (req, res) => {
    if(req.cookies.user){
        res.sendFile(path.resolve('src/public/home.html'))
    }
    else{
        res.redirect('/')
    }
})
router.get('/sections', async (req, res) => {
    data = await db.find()
    if(data){
        res.json({data: data}) 
    }
    else{
       res.json({refused: true, error: "There is a problem with the DB."}) 
    }
    
})

// router.post('/register', upload.findOne('data'), async (req, res, next) => {

//     let {username, userpass} = req.body
//     let addUser = new User({name: username, pin: userpass, score: 0, level: "PRINCIPIANTE"})
//     let verifyUser = await User.findOne({name: username})
//     if(verifyUser){
//         res.json({refused: true, error: "The user has already exist, please try again"})
//     }
//     else{
//         try{
//             addUser.save()
//             res.json({conf: 'register success'})
//         }
//         catch(e){
//             console.log(e)
//             res.json({refused: true, error: 'There was an error'})
//         }
        
//     }
// })

// router.post('/eval', upload.none(), async (req, res) => {
//     if(req.cookies.user){
//         const question = await evalQuestion(req.body, req.cookies)
//         if(question.end){
//             res.cookie('end', true)
//             res.json(question)
//         }
//         else{
//              res.json(question)
//         }
//     }
//     else{
//         res.redirect('/')
//     }
    
// })

// router.post('/savedata', upload.none(), async (req, res) => {
//         if(req.cookies.user){
//             let conf = await saveData(req.body.score, req.cookies.user)
//             if(conf.saved){
//                 res.cookie('score', conf.score)
//                 res.json({conf: true})
//             }
//             else{
//                 res.json({conf: false})
//             }
            
//         }
        
// })


module.exports = router