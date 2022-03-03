const db = require('mongoose')
const {Schema} = db

const candidate =  new Schema({
    name: {type: String, require: true},
    id: {type: Number, require: true},
    votes: {type: Number, required: true}
})

module.exports = db.model('candidate', candidate)