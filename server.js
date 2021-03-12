// Import 
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser")
const products = require('./routes/products')
const users = require('./routes/users')

// Create a server object 
const server = express();

// Connect to the database using mongoose
const connectionString = "mongodb+srv://admin1:Group6-indigoeagles.@cluster0.k45mn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const connectionConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
mongoose
    .connect(connectionString, connectionConfig)
    .then(
        () => {
            console.log("DB is connected")
        }
    )
    .catch(
        (error) => {
            console.log("error occured", error)
        }
    )

// Tell express how to use body-parser
server.use( bodyParser.urlencoded({ extended: false }) );

// Also tell express to recognize JSON
server.use( bodyParser.json() );

// Create a Route
server.get(
    '/home',
    (req, res) => {
        res.send("<h1>Hello</h1>");
    }
);

server.get(
    '/contact',
    (req, res) => {
        res.send("<h1>Hello</h1>");
    }
);


server.use(
    '/products',
    products
)

server.use(
    '/users',
    users
)

server.listen(
    3002,
    () => {
        console.log("server is runing on http://localhost:3002")
    });