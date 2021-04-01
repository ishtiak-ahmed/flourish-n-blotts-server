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
const ObjectID = require('mongodb').ObjectID
const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.xzynl.mongodb.net/${DATABASE}?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    console.log('connection error ', err)
    const booksCollection = client.db('flourishblotts').collection("books");

    console.log('mongodb connected succesfully..')

    // Post products
    app.post('/addBook', (req, res) => {
        const newBook = req.body
        booksCollection.insertOne(newBook)
            .then(result => {
                res.send(result.insertedCount > 0)
            })
    })

    // Read or Load Products From Database
    app.get('/books', (req, res) => {
        const books = booksCollection.find({})
            .toArray((err, documents) => {
                res.send(documents)
            });
    })

    // Delete Products
    app.delete('/delete/:id', (req, res) => {
        booksCollection.deleteOne({ _id: ObjectID(req.params.id) })
            .then((err, result) => {
                console.log(result.deletedCount)
            })
    })

    // Find one Produdct
    app.get('/addtocart/:id', (req, res) => {
        booksCollection.find({ _id: ObjectID(req.params.id) })
            .toArray((err, document) => {
                res.send(document)
            })
    })

    // Order list
    const orderlist = client.db('flourishblotts').collection("orderlist");
    // Add to cart or order list
    app.post('/addorder', (req, res) => {
        const newItem = req.body
        orderlist.insertOne(newItem)
            .then(result => {
                res.send(result.insertedCount > 0)
            })
    })
    // Load Order list from database for user
    app.post('/orders', (req, res) => {
        console.log(req.body)
        const orders = orderlist.find({ buyer: req.body.buyer })
            .toArray((err, documents) => {
                res.send(documents)
            });
    })

})


app.listen(PORT, () => {
    console.log(`Flourish and blotts server is running at http://localhost:${PORT}`)
})