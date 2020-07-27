const express = require('express')
const app = express()
const ejs = require('ejs')
const fs = require('fs')
const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient("mongodb://127.0.0.1:27017", {
    useUnifiedTopology: true,
});
const bodyParser = require('body-parser');
const {
    response
} = require('express');
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
const students = []
const groupe = []



// REQUETE MONGODB DONNEE  ---------------------------------------------------------------------------------------->
async function connect() {
    await client.connect()
}
connect()

async function data() {
    var etudiants = await client.db('GroupGenerator').collection('Students').find().toArray()
    students.push(etudiants)
    var groups = await client.db('GroupGenerator').collection('Groups').find().toArray()
    groupe.push(groups)
}

data()

// REQUETE GET FRONT STUDENTS ------------------------------------------------------------------------------------->

app.get('/students', (req, res) => {
    try {
        const template = fs.readFileSync('./student.ejs', 'utf-8')
        var html = ejs.render(template, {
            students: students
        })
        res.send(html)
    } catch (e) {
        console.log(e)
    }
})

//REQUETE POST FRONT STUDENT ---------------------------------------------------------------------------------->

app.post("/students", (req, res) => {
    async function post() {
        try {
            var data = {
                name: req.body.name.toUpperCase()
            };
            students[0].push({
                name: req.body.name.toUpperCase()
            })
            console.log(students)
            console.log(data)
            await client.db("GroupGenerator").collection("Students").insertOne(data);
            const template = fs.readFileSync('./student.ejs', 'utf-8')
            var html = ejs.render(template, {
                students: students
            })
            res.send(html)

        } catch (e) {
            console.log(e);
        }
    }
    post();
});

// REQUETE GET FRONT GROUP ---------------------------------------------------------------------------------->  

app.get('/groups', (req, res) => {
    try {
        const template = fs.readFileSync('./groups.ejs', 'utf-8')
        var html = ejs.render(template, {
            groupe: groupe
        })
        res.send(html)
    } catch (error) {
        console.log(error)
    }
})

//REQUETE POST FRONT GROUP  --------------------------------------------------------------------------------->
app.post('/groups', (req, res) => {
    res.send(req.body)
    class GROUPE {
        constructor() {
            this.grpName = req.body.grpName;
            this.nbrPersonnes = req.body.nbrPersonnes;
        }
    }
    let NGroupe = new GROUPE
    console.log(NGroupe)
})

app.listen(3000, function () {
    console.log('listening on 3000')
})