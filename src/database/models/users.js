const db = require('mongoose')
const {Schema} = db

const register = new Schema({
    name: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, required: true}
})

module.exports = db.model('Users', register)