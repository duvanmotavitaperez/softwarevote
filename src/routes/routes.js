const express = require('express')
const db = require('mongoose')
const router = express.Router()
const multer = require('multer')
const upload = multer({dest: '../uploads'})
const path = require('path')

router.get('/', (req, res) => {
    res.sendFile(path.resolve('src/public/index.html'))
    console.log('test two')
})
router.post('/register', (req, res) => {
    console.log('Test')
})
module.exports = router