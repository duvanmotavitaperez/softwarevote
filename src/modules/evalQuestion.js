const db = require('../database/models/questions')
const randomNum = require('../modules/randomNum')

async function evalQuestion(value){
    
    if(value.level === "starting"){
        let data = await db.findOne({category:"min", questionId: randomNum()})
        return {data: data, userdata: {user: value.user, score: value.score}, score: 100}
    }
    else if(value.level === "min"){
        let data = await db.findOne({category:"min", questionId: value.questionId})
        if(value.level.answer === data.correct){
            let data = await db.findOne({category:"low", questionId: randomNum()})
            return {data: data, score: 300}
        }
        else{
            return {refused: true, error: 'respuesta erronea'}
        }
   
    }
    else if(value.level === "low"){
        let data = await db.findOne({category:"low", questionId: value.questionId})
        if(value.level.answer === data.correct){
            let data = await db.findOne({category:"medium", questionId: randomNum()})
            return {data: data, score: 500}
        }
        else{
            return {refused: true, error: 'respuesta erronea'}
        }
   
    }
    else if(value.level === "medium"){
        let data = await db.findOne({category:"medium", questionId: value.questionId})
        if(value.level.answer === data.correct){
            let data = await db.findOne({category:"high", questionId: randomNum()})
            return {data: data, score: 700}
        }
        else{
            return {refused: true, error: 'respuesta erronea'}
        }
   
    }
    else if(value.level === "high"){
        let data = await db.findOne({category:"high", questionId: value.questionId})
        if(value.level.answer === data.correct){
            let data = await db.findOne({category:"max", questionId: randomNum()})
            return {data: data, score: 900}
        }
        else{
            return {refused: true, error: 'respuesta erronea'}
        }
   
    }
    else if(value.level === "max"){
        let data = await db.findOne({category:"max", questionId: value.questionId})
        if(value.level.answer === data.correct){
            let data = await db.findOne({category:"max", questionId: randomNum()})
            return {data: data, score: 1100}
        }
        else{
            return {refused: true, error: 'respuesta erronea'}
        }
   
    }
    else{
        console.log(value , 'inside eval')
        return {refused: true, error: 'category is missing'}
    }
}

module.exports = evalQuestion