const db = require('mongoose')
const {Schema} = db

const Voter = new Schema({
    username: {type: String, required: true},
    uservote: {type: Boolean, required: true},
})

module.exports = db.model("voters", Voter)