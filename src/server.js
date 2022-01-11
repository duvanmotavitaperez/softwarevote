const express = require('express')
const db = require('./database/connect')
require('./modules/DatabaseConfig')
const ip = require('./modules/getIpAddress')
const morgan = require('morgan')
const path = require('path')
const app = express()

app.set('port', process.env.PORT || 3000)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(require('./routes/routes'))
app.use(express.static(path.resolve('src/public')))

app.listen(app.get('port'), () =>{
    console.log('(alt + clic) en '+ ` http://${ip}:3000/ ` + 'o copia  la dirección en el navegador')
})