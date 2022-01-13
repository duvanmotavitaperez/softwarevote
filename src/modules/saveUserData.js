const db = require('../database/models/users')
const User = require('../database/models/users')

async function saveData(score, user){
   let data = await db.findOneAndUpdate({name: user}, {$set: {"score": score}})
   let dataScore = await User.findOne({name: user})
   if(dataScore.score == score){
       return {saved: true, score: dataScore.score}
   }
   return false

}

module.exports = saveData