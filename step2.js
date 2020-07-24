const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient("mongodb://127.0.0.1:27017", {
    useUnifiedTopology: true,
});
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
async function connect(){
    await client.connect()
}

connect()
// REQUETE POST  STUDENTS ---------------------------------------------------------------------------------->

app.post("/students", (req, res) => {
    async function post() {
        try {
            var data = req.body;
            data.name.forEach((element) => {
                envoie = {
                    name: element,
                };
                client.db("GroupGenerator").collection("Students").insertOne(envoie);
            });
        } catch (e) {
            console.log(e);
        }
    }
    post();
    res.send("Recues");
});
// REQUETE GET STUDENTS:name ----------------------------------------------------------------------------->

app.get('/students/:name', (req, res) => {
    async function get(){
        try {
            let id = req.params.name
            console.log(id)
            let etudiant = await client.db('GroupGenerator').collection('Students').find({name : id}).toArray()
            res.send(etudiant)
        } catch (error) {
            console.log(error)
        }
    }
    get();
})


// REQUETE GET STUDENTS ---------------------------------------------------------------------------------->

app.get("/students", (req, res) => {
    async function get() {
        try {
            let etudiants = await client
                .db("GroupGenerator")
                .collection("Students")
                .find()
                .toArray();
            res.json(etudiants);
        } catch (e) {
            console.log(e);
        }
    }

    get();
});
// REQUETE DELETE STUDENTS:name ----------------------------------------------------------------------->

app.delete('/students/:name', (req,res)=>{
    async function effacer(){
        try {
            let id = req.params.name
            await client.db('GroupGenerator').collection('Students').deleteMany({name: id})
            res.send(`C'est terminé ! ${id} !`)
        } catch (error) {
            console.log(error)
        }
    }
    effacer()
})

// REQUETE DELETE STUDENTS ---------------------------------------------------------------------------->
app.delete("/students", (req, res) => {
    async function effaccer() {
        try {
            let student = await client
                .db("GroupGenerator")
                .collection("Students")
                .find()
                .toArray();
            student.forEach((element) => {
                client.db("GroupGenerator").collection("Students").deleteOne(element);
            });
            res.send("cest bien effacer");
        } catch (e) {
            console.log(e);
        }
    }
    effaccer();
});

// REQUETE POST GROUP ---------------------------------------------------------------------------------->

app.post("/groups", (req, res) => {
    async function post() {
        try {
            var data = req.body;
            client.db("GroupGenerator").collection("Groups").insertOne(data);
        } catch (e) {
            console.log(e);
        }
    }
    post();
    res.send("Recues");
});

//REQUETE GET GROUP ----------------------------------------------------------------------------------------->

app.get("/groups", (req, res) => {
    async function get() {
        try {
            let group = await client
                .db("GroupGenerator")
                .collection("Groups")
                .find()
                .toArray();
            res.json(group);
        } catch (e) {
            console.log(e);
        }
    }

    get();
});

// REQUETE GET GROUP:NAME ------------------------------------------------------------------------------------------>

app.get("/groups/:grName", (req, res) => {
    async function get() {
        try {
            let id = req.params.grName;
            console.log(id);
            let groupe = await client
                .db("GroupGenerator")
                .collection("Groups")
                .find({
                    grpName: id
                })
                .toArray();
            if (groupe.length != 0) {
                res.status(200).send(groupe);
            } else {
                res.status(404).send("Error 404 , Groupe inexitant");
            }
        } catch (error) {
            console.log(error);
        }
    }
    get();
});

// REQUETE DELETE GROUP ALL----------------------------------------------------------------------------------------->

app.delete("/groups", (req, res) => {
    async function effaccer() {
        try {
            let group = await client
                .db("GroupGenerator")
                .collection("Groups")
                .find()
                .toArray();
            group.forEach((element) => {
                client.db("GroupGenerator").collection("Groups").deleteOne(element);
            });
            res.send("cest bien effacer");
        } catch (e) {
            console.log(e);
        }
    }
    effaccer();
});

// REQUETE DELETE GROUP:name----------------------------------------------------------------------------------------->

app.delete("/groups/:name", (req, res) => {
    async function effaccer() {
        try {
            var id = req.params.name;
            let group = await client
                .db("GroupGenerator")
                .collection("Groups")
                .find({
                    grpName: id.toUpperCase(),
                })
                .toArray();
            console.log(group);
            if (group.length != 0) {
                group.forEach(element => {
                client.db("GroupGenerator").collection("Groups").deleteOne(element);
                });
                res.send("cest bien effacer");
            } else {
                res.send("Error 404");
            }
        } catch (e) {
            console.log(e);
        }
    }
    effaccer();
});

app.listen(3000, function () {
    console.log("listening on 3000");
});