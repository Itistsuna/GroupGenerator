const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const client = new MongoClient('mongodb://127.0.0.1:27017')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


// REQUETE POST ----------------------------------------------------------------------------------
app.post('/students', (req, res) => {
    async function post() {
        try {
            var data = req.body
            await client.connect()
            data.name.forEach(element => {
                console.log(element)
                envoie = { name: element }
                console.log(envoie)
                client.db('GroupGenerator').collection('Students').insertOne(envoie)
            });
        } catch (e) {
            console.log(e)
        } finally {
            await client.close()
        }
    }
    post()
    res.send('Recues')
})

// REQUETE GET ----------------------------------------------------------------------------------

app.get('/students', (req, res) => {
    async function get() {
        try {
            await client.connect()
            let etudiants = await client.db('GroupGenerator').collection('Students').find().toArray()
            res.json(etudiants)
        } catch (e) {
            console.log(e)
        } finally {
            await client.close()
        }
    }

    get()



})
// REQUETE DELETE ---------------------------------------------------------------------------->
app.delete('/students', (req,res) => {
    async function effaccer() {
        try{
            await client.connect()
            let student = await client.db('GroupGenerator').collection('Students').deleteMany(student)
            res.send('cest bien effacer')

        } catch(e){
            console.log(e)

        }
        finally{
            await client.close();
        }
    }
    effaccer()
})

app.listen(3000, function () {
    console.log('listening on 3000')
})