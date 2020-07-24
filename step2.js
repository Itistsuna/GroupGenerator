const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const client = new MongoClient('mongodb://127.0.0.1:27017')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


// REQUETE POST ----------------------------------------------------------------------------------
app.post('/students', (req,res)=>{
    async function post(){
        try {
            var data = req.body
            await client.connect() 
            data.name.forEach(element => {
                console.log(element)
                envoie = {name: element}
                console.log(envoie)
                client.db('GroupGenerator').collection('Students').insertOne(envoie) 
            });
        }catch(e){
            console.log(e)
        }finally{
            await client.close()
        }
    }    
    post()
    res.send('Recues')
})

// REQUETE GET ----------------------------------------------------------------------------------



app.listen(3000, function() {
    console.log('listening on 3000')
})