const Users = require('../database/models/users')
const parser = require('csv-parser')
const fs = require('fs')
const path = require('path')
class DatabaseConfig{

    saveData(){
        this.file = fs.createReadStream(path.resolve('users.csv'))
        this.file
        .pipe(parser({
            separator: ';',
        }))
        .on('data', data => {
            try{
                this.user = new Users({name: data.name, password: data.password, role: data.role})
                this.user.save()
                console.log('Los datos de usuario se han guardado corretamente.')
            }catch(e){
                console.log(e)
            }
        })
        .on('end',  () => {
                fs.unlink(path.resolve('users.csv'), (e) => {
                    if (e) throw e
                    console.log("Datos procesados correctamente. ")
                }) 
        })
        
    }
    searchData(){
        Users.findOne({rol: "admin"})
        .then(data => {
            if(!data){
                this.saveData()
            } 
        })
        .catch(e => console.log(e))
    }
}

let ins = new DatabaseConfig()

module.exports = ins.searchData()