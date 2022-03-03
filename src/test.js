const fs = require("fs")
const parser = require("csv-parser")
readStream = fs.createReadStream('newdata.csv')
var list = [1]
readStream    
   .pipe(parser({
        separator: ';',
        newline: '\n'
    }))
   .on("data", (data) => {
        list.push(data)
    })


console.log(list)