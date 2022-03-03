const Sections = require('../database/models/sections')
async function getsection(){
    list = await Sections.find()
    return list
}
module.exports = getsection