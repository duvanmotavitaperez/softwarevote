var questions = ["uno", "Dos", "Tres"];

function question(i){
    process.stdout.write(questions[i])
}
class test{
    constructor(questions){
        this.question = questions
        this.response = []
    }
    makeQuestion(){
                    process.stdin.on('data', function(data){
                    this.response.push(data.toString().trim())
                if(questions.length > response.length){
                    question(response.length)
                }else{
                    process.exit()
                }
        })
    }

    preguntar(){
        question(0)
        this.makeQuestion()
    }
}

const ins = new test(questions)

ins.preguntar()