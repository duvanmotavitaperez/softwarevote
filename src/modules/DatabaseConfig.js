const fs = require('fs')
const Questions = require('../database/models/questions')
class DatabaseConfig{
    searchData(){
        const data = Questions.find()
        if(data){
            return true
        }
        else{
            return false
        }
    }
    createQquestions(){
        if(this.searchData()){
            return
        }
        else{
            fs.readFile(path.resolve('src/defaultQuestions.json'), (err, data) => {
                if (err) throw err;
                let questions = JSON.parse(data);
                console.log(questions)
            })
        }
    }
}