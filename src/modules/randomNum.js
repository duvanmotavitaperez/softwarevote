function randomNum(){
    let num = Math.floor(Math.random() * (4-1+1)) + 1
    return num
}

module.exports = randomNum