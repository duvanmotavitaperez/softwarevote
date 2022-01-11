const db = require('mongoose')
const {Schema} = db

const createQuestion = new Schema({
    name: {type: String, required: true},
    pin: {type: String, required: true},
    score: {type: Number, required: true},
})

module.exports = db.model('questions', createQuestion)