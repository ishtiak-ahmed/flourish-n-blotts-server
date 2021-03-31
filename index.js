const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

app.use(cors())

const PORT = process.env.PORT || 5555
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const DATABASE = process.env.DB_NAME

app.get('/', (req, res) => {
    res.send('Hello! This is root server.')
})
// Mongodb connection
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.xzynl.mongodb.net/flourishblotts?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    // console.log('connection error ', err)
    const books = client.db(DATABASE).collection("books");

    console.log('mongodb connected succesfully..')

    // Post products
    app.get('/addBook', (req, res) => {
        res.send('adding books.')
        console.log('adding book')
    })

    app.get('/products', (req, res) => {
        const products = books.find({})
            .toArray((err, document) => {
                res.send(document)
            });
        products.forEach(prod => {
            const product = (JSON.stringify(prod))
            console.log(product)
        })
    })
    // Adding book in bangla syst
    // perform actions on the collection object
    // client.close();
})







app.listen(PORT, () => {
    console.log(`Flourish and blotts server is running at http://localhost:${PORT}`)
})