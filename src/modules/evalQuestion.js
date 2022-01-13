const db = require('../database/models/questions')
const randomNum = require('../modules/randomNum')

async function evalQuestion(value, cookies){

    if(value.level === "starting"){
        let data = await db.findOne({category:"min", questionId: randomNum()})
        return {data: data, userdata: {user: cookies.user, score: cookies.score}, score: 100}
    }
    else if(value.level === "min"){
        let data = await db.findOne({category:"min", questionId: value.questionId})
        if(value.answer === data.correct){
            let data = await db.findOne({category:"low", questionId: randomNum()})
            return {data: data, score: 300}
        }
        else{
            return {refused: true, error: 'respuesta erronea'}
        }
   
    }
    else if(value.level === "low"){
        let data = await db.findOne({category:"low", questionId: value.questionId})
        if(value.answer === data.correct){
            let data = await db.findOne({category:"medium", questionId: randomNum()})
            return {data: data, score: 500}
        }
        else{
            return {refused: true, error: 'respuesta erronea'}
        }
   
    }
    else if(value.level === "medium"){
        let data = await db.findOne({category:"medium", questionId: value.questionId})
        if(value.answer === data.correct){
            let data = await db.findOne({category:"high", questionId: randomNum()})
            return {data: data, score: 700}
        }
        else{
            return {refused: true, error: 'respuesta erronea'}
        }
   
    }
    else if(value.level === "high"){
        let data = await db.findOne({category:"high", questionId: value.questionId})
        if(value.answer === data.correct){
            let data = await db.findOne({category:"max", questionId: randomNum()})
            return {data: data, score: 900}
        }
        else{
            return {refused: true, error: 'respuesta erronea'}
        }
   
    }
    else if(value.level === "max"){
        let data = await db.findOne({category:"max", questionId: value.questionId})
        if(value.answer === data.correct){
            return {score: 1100, end: true}
        }
        else{
            console.log(value.answer, data.correct)
            return {refused: true, error: 'respuesta erronea'}
        }
   
    }
    else{
        return {refused: true, error: 'category is missing'}
    }
}

module.exports = evalQuestion