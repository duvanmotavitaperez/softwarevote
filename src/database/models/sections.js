const db = require('mongoose')
const {Schema} = db

const Sections = new Schema({
    name: {type: String, required: true}
})

module.exports = db.model('sections', Sections)