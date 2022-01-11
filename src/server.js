const express = require('express')
const ip = require('./modules/getIpAddress')
const morgan = require('morgan')
const path = require('path')
const fs = require('fs')
fs.readFile(path.resolve('src/defaultQuestions.json'), (err, data) => {
    if (err) throw err;
    let student = JSON.parse(data);
})
const app = express()
app.set('port', process.env.PORT || 3000)

app.use(express.json())
app.use(morgan('dev'))
app.use(require('./routes/routes'))

app.use(express.static(path.resolve('src/public')))
app.listen(app.get('port'), () =>{
    console.log('(alt + clic) en '+ ` http://${ip}:3000/ ` + 'o copia  la dirección en el navegador')
})