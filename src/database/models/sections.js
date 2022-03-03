const db = require('mongoose')
const {Schema} = db

const Sections = new Schema({
    id: {type: String, required: true},
    sectionname: {type: String, required: true}
})

module.exports = db.model('sections', Sections)