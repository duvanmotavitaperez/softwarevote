const fs = require('fs')
const Questions = require('../database/models/questions')
const path = require("path")
class DatabaseConfig{
    saveData(confirmation){
        if(confirmation){
            fs.readFile(path.resolve('src/defaultQuestions.json'), (err, data) => {
                if (err) throw err
                let questions = JSON.parse(data)
                Object.keys(questions).forEach( category => {
                        questions[category].forEach(question => {
                            let addQuestion = new Questions({category: question.category, question: question.question,questionId: question.questionId, 1: question["1"], 2: question["2"], 3: question["3"], 4: question["4"], correct: question.correct})
                            addQuestion.save()
                             
                        }) 
                })
                console.log("The question bank has been created")
            })
        }
    }

    searchData(){
        Questions.findOne({category: "min"})
        .then(data => {
            if(!data){
                this.saveData(true)
            } 
        })
        .catch(e => console.log(e))
    }

    
}

let ins = new DatabaseConfig()
module.exports = ins.searchData()