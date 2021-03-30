const express = require('express')
const app = express()
require('dotenv').config()
// const PORT = 1454
// const DB_USER = 'flourishblottsmanager'
// const DB_PASS = 'alohomora'
// const database = 'flourishblotts'
// console.log({ process.env.DB_PASS })

app.get('/', (req, res) => {
    res.send('Hello Wizards and Witches!')
})
// Mongodb connection
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.xzynl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const books = client.db(database).collection("books");
    console.log('mongodb connected succesfully..')
    // perform actions on the collection object
    // client.close();
})







app.listen(PORT, () => {
    console.log(`Flourish and blotts server is running at http://localhost:${PORT}`)
})