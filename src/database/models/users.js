const db = require('mongoose')
const {Schema} = db

const register = new Schema({
    name: {type: String, required: true},
    pin: {type: String},
})

module.exports = db.model('Users', register)