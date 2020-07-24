const express = require('express')
const app = express()
const ejs = require('ejs')
const fs = require('fs')
const MongoClient = require('mongodb').MongoClient
const client = new MongoClient('mongodb://127.0.0.1:27017')
const bodyParser = require('body-parser')
const helmet = require('helmet')
app.use(helmet.noSniff)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))


// REQUETE GET FRONT STUDENTS ------------------------------------------------------------------------------------->

app.get('/students', (req, res) => {
    try {
        const template = fs.readFileSync('./student.ejs', 'utf-8')
        var html = ejs.render(template)
        res.send(html)
    } catch (e) {
        console.log(e)
    }
})
// REQUETE GET FRONT GROUP ---------------------------------------------------------------------------------->  

app.get('/groups', (req, res) => {
    try {
        const template = fs.readFileSync('./groups.ejs', 'utf-8')
        var html = ejs.render(template)
        res.send(html)
    } catch (error) {
        console.log(error)
    }
})


app.listen(3000, function () {
    console.log('listening on 3000')
})