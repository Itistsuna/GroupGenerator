const MongoClient = require('mongodb').MongoClient
const client = new MongoClient('mongodb://127.0.0.1:27017')

async function main(){
    try {
        await client.connect()
        await client.db('GroupGenerator').createCollection('Students')
        await client.db('GroupGenerator').createCollection('Groups')
    } catch (error) {
        console.log(error)
    }finally{
        await client.close()
    }
}

main()