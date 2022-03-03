const db = reuire('mongoose')
const {Schema} = db

const voter = new Schema({
    username: {type: String, require: true},
    uservote: {type: Boolean, require: true},
    section: {type: String, require: true}
})

module.exports = db.model("voter", voter)