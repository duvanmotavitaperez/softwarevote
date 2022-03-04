const db = require('mongoose')
const {Schema} = db

const candidate =  new Schema({
    id: {type: Number, required: true},
    personero: {type: String, required: true},
    formula: {type: String, required: true},
    section: {type: String, required: true},
    votes: {type: Number, required: true}
})

module.exports = db.model('candidate', candidate)