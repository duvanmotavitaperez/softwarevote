const path = require('path')
const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({dest: '../uploads'})
const cookieParser = require('cookie-parser')
const User = require('../database/models/users')
const Voter = require('../database/models/voter')
const Sections = require('../database/models/sections')
const Candidate = require('../database/models/candidates')
const getsection = require('../modules/getSection')

!async function start(){
    list = await getsection()
    router.use(cookieParser())
    router.get(`/`, (req, res) => {
        res.clearCookie("user", { path: '/' })
        res.clearCookie("role", { path: '/' })
        res.clearCookie("section", { path: '/' })
        res.sendFile(path.resolve('src/public/index.html'))
    })

    router.post('/login', upload.none(), async (req, res, next) => {
        let {username, userpass, section} = req.body
        let user = await User.findOne({name: username, pin: userpass})
        if(user){
            res.cookie('user', user.name)
            res.cookie('role', user.role)
            res.cookie('section', section)
            res.json({url: 'voter'})
            
        }
        else{
            res.json({refused: true, error: "Sus credenciales de inicio de sesión no son correctas."})
        }
        })
    router.get('/voter', (req, res)=>{
        if(req.cookies.user && req.cookies.role){
            res.clearCookie('username', { path: '/' })
            res.sendFile(path.resolve(`src/public/votersignin.html`))
        }
        else{
            res.redirect('/')
        }
    })
    router.post('/voter', upload.none(), async (req, res, next)=>{
        let {username} = req.body
        if(req.cookies.user && req.cookies.role){
            let user = await Voter.findOne({username: username})
            if(user.username && !user.uservote){
                res.cookie('username', user.username)
                if(list[0].sectionname == req.cookies.section){
                    res.json({url: list[0].id})
                }
                else if(list[1].sectionname == req.cookies.section){
                    res.json({url: list[1].id})
                }
                
            }
            else{
                res.json({refused: true, error: "Ya tines un voto registrado."})
            }
        }
        else{
            res.redirect('/')
        }
    })
    router.get(`/${list[0].id}`, upload.none(), (req, res) => {
        if(req.cookies.user && req.cookies.username){
            res.sendFile(path.resolve(`src/public/${list[0].sectionname}.html`))
        }
        else{
            res.redirect('/')
        }
    })
    router.get(`/${list[1].id}`, upload.none(), (req, res) => {
        if(req.cookies.user && req.cookies.username){
            res.sendFile(path.resolve(`src/public/${list[1].sectionname}.html`))
        }
        else{
            res.redirect('/')
        }
    })
    router.post('/procesar', upload.none(), async (req, res) => {
        let id = parseInt(req.body.id)
        if( id == 0){
            data = await Candidate.findOneAndUpdate({id: parseInt(req.body.id), section: "Both"}, {$inc: {votes: 1}})
        }
        else{
            data = await Candidate.findOneAndUpdate({id: id, section: req.cookies.section}, {$inc: {votes: 1}})
        }
        if(data){
            user = await Voter.findOneAndUpdate({username: req.cookies.username}, {$set: {uservote: true}})
            res.json({url: "voter"})
        }
        else{
            res.json({refused: true, error: "El canditato no ha sido encontrado."})
        }
    })
    router.get('/sections', upload.none(), async (req, res) => {
        data = await Sections.find({},{sectionname: 1})
        if(data){
            res.json({data: data}) 
        }
        else{
            res.json({refused: true, error: "There is a problem with the DB."}) 
        }
        
    })
    
    router.post('/home', upload.none(), async (req, res) => {
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
}()

module.exports = router