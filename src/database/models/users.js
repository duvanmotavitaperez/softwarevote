const db = require('mongoose')
const {Schema} = db

const register = new Schema({
    name: {type: String, required: true},
    pin: {type: String, required: true},
    score: {type: Number, required: true},
    level: {type: String}
})

module.exports = db.model('Users', register)