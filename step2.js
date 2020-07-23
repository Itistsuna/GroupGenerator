const express = require('express')
const app = express()
const router = express.Router()

const MongoClient = require('mongodb').MongoClient
const client = new MongoClient('mongodb://127.0.0.1:27017')
const data = {
    name: 'thomas',
    name: 'arnaud'
    
}

async function main() {
    try {
        await client.connect()
        const db = client.db('GroupGenerator')
        app.use('/', router)

        router.route("/GroupGenerator/Students").post((req, res) =>{
            kennel.inserMany(data,(e, result) =>{
                if(e){
                    res.send(e)
                } else {
                    res.send(result)
                }
            })
        })

    } catch (e) {
        console.log(e)

    } finally {

    }

}
main()
