const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

// Use Middleware
app.use(cors())
app.use(express.json());
app.use(express.urlencoded());

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
// const uri = `mongodb+srv://testuser:test1357@cluster0.xzynl.mongodb.net/flourishblotts?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    console.log('connection error ', err)
    const booksCollection = client.db('flourishblotts').collection("books");

    console.log('mongodb connected succesfully..')

    // Post products
    app.post('/addBook', (req, res) => {
        const newBook = req.body
        console.log(newBook)
        booksCollection.insertOne(newBook)
            .then(result => {
                console.log('inserted item ', result.insertedCount)
                res.send(result.insertedCount > 0)
            })
    })

    app.get('/books', (req, res) => {
        const books = booksCollection.find({})
            .toArray((err, documents) => {
                res.send(documents)
            });
        console.log(books)
        // books.forEach(prod => {
        //     const product = (JSON.stringify(prod))
        //     console.log(product)
        // })
    })
})







app.listen(PORT, () => {
    console.log(`Flourish and blotts server is running at http://localhost:${PORT}`)
})