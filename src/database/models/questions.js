const db = require('mongoose')
const {Schema} = db

const questions =  new Schema({
    category: {type: String, required: true},
    questionId: {type: Number, required: true},
    question: {type: String, required: true},
    1: {type: String, required: true},
    2: {type: String, required: true},
    3: {type: String, required: true},
    4: {type: String, required: true},
})

module.exports = db.model('Questions', questions)