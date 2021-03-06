const db = require('../database/connect')
const Users = require('../database/models/users')
const Sections = require('../database/models/sections')
const Voter = require('../database/models/voter')
const Candidate = require('../database/models/candidates')
const parser = require('csv-parser')
const fs = require('fs')
const path = require('path')
class DatabaseConfig{

    saveData(){

        this.users = fs.createReadStream(path.resolve('users.csv'))
        
        this.users
        .pipe(parser({
            separator: ';',
        }))
        .on('data', data => {
            try{
                this.user = new Users({name: data.name, password: data.password, role: data.role})
                this.user.save()
            }catch(e){
                console.log(e)
            }
        })
        .on('end',  () => {
                // fs.unlink(path.resolve('users.csv'), async (e) => {
                //     if (e) throw e
                //     let users = await Users.find({}, {'name': 1, 'role':1})
                //     console.log(users)
                //     console.log("Datos de usuario procesados correctamente.")
                // }) 
                console.log("Datos de usuario procesados correctamente. ")
        })
        this.candidates = fs.createReadStream(path.resolve('candidates.csv'))
        this.candidates
            .pipe(parser({
                separator: ';',
            }))
            .on('data', data => {
                console.log(data)
                try{
                    this.candidate = new Candidate({id: data.id, personero: data.personero, formula: data.formula, section: data.section, votes: 0})
                    this.candidate.save()
                }catch(e){
                    console.log(e)
                }
            })
            .on('end',  () => {
                console.log("Datos datos de los candidatos fueron procesados correctamente. ")
            })
        

        this.sections = fs.createReadStream(path.resolve('sections.csv'))
        this.sections
        .pipe(parser({
            separator: ';',
        }))
        .on('data', data => {
            console.log(data)
            try{
                this.section = new Sections({id: data.id, sectionname: data.sectionname})
                this.section.save()
            }catch(e){
                console.log(e)
            }
        })
        .on('end',  () => {
            console.log("Datos de secciones procesados correctamente. ")
        })

        this.voters = fs.createReadStream(path.resolve('voters.csv'))
        this.voters
        .pipe(parser({
            separator: ';',
        }))
        .on('data', data => {
            try{
                this.voter = new Voter({username: data.username, uservote: false})
                this.voter.save()
            }catch(e){
                console.log(e)
            }
        })
        .on('end',  () => {
            console.log("Datos de votantes procesados correctamente. ")
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

ins.searchData()