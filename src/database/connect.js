const db = require('mongoose')
const url = 'mongodb://localhost/votes'
db.connect(url)
    .then(data => console.log('Db has been connected'))
    .catch(e => console.log(e))

module.exports = db