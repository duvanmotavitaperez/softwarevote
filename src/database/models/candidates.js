const db = require('mongoose')
const {Schema} = db

const candidate =  new Schema({
    id: {type: Number, required: true},
    politicalparty: {type: String},
    personero: {type: String, required: true},
    formula: {type: String, required: true},
    sectionname: {type: String, required: true},
    votes: {type: Number, required: true}
})

module.exports = db.model('candidate', candidate)