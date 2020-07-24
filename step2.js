const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const client = new MongoClient('mongodb://127.0.0.1:27017')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


// REQUETE POST  STUDENTS ---------------------------------------------------------------------------------->

app.post('/students', (req, res) => {
    async function post() {
        try {
            var data = req.body
            await client.connect()
            data.name.forEach(element => {
                envoie = { name: element }
                client.db('GroupGenerator').collection('Students').insertOne(envoie)
            });
        } catch (e) {
            console.log(e)
        } 
    }
    post()
    res.send('Recues')
})

// REQUETE GET STUDENTS ---------------------------------------------------------------------------------->

app.get('/students', (req, res) => {
    async function get() {
        try {
            await client.connect()
            let etudiants = await client.db('GroupGenerator').collection('Students').find().toArray()
            res.json(etudiants)
        } catch (e) {
            console.log(e)
        }
    }

    get()



})
// REQUETE DELETE STUDENTS ---------------------------------------------------------------------------->
app.delete('/students', (req, res) => {
    async function effaccer() {
        try{
            await client.connect()
            let student = await client.db('GroupGenerator').collection('Students').find().toArray()
            student.forEach(element => {
                client.db('GroupGenerator').collection('Students').deleteOne(element)
            });
            res.send('cest bien effacer')
        } catch(e){
            console.log(e)
        }
    }
    effaccer()
})

// REQUETE POST GROUP ---------------------------------------------------------------------------------->

app.post('/groups', (req, res) => {
    async function post() {
        try {
            var data = req.body
            await client.connect()
            data.name.forEach(element => {
                envoie = { group: element }
                client.db('GroupGenerator').collection('Groups').insertOne(envoie)
            });
        } catch (e) {
            console.log(e)
        } 
    }
    post()
    res.send('Recues')
})

//REQUETE GET GROUP ----------------------------------------------------------------------------------------->

app.get('/groups', (req, res) => {
    async function get() {
        try {
            await client.connect()
            let group = await client.db('GroupGenerator').collection('Groups').find().toArray()
            res.json(group)
        } catch (e) {
            console.log(e)
        }
    }

    get()
})

// REQUETE DELETE GROUP ----------------------------------------------------------------------------------------->

app.delete('/groups', (req, res) => {
    async function effaccer() {
        try{
            await client.connect()
            let group = await client.db('GroupGenerator').collection('Groups').find().toArray()
            group.forEach(element => {
                client.db('GroupGenerator').collection('Groups').deleteOne(element)
            });
            res.send('cest bien effacer')
        } catch(e){
            console.log(e)
        }
    }
    effaccer()
})




app.listen(3000, function () {
    console.log('listening on 3000')
})