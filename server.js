// Import 
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const expressFormData = require('express-form-data');
const cors = require("cors");
const products = require('./routes/products');
const users = require('./routes/users');
const cloudinary = require('cloudinary').v2;



// package that allows express to read the environment variables(like CONNECTION_STRING)
require('dotenv').config();

// Create a server object 
const server = express();

// Connect to the database using mongoose
const connectionString = process.env.CONNECTION_STRING;
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


// Configure for Cloudinary
cloudinary.config(
    {
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
    }
)

server.use(cors());
// Tell express how to use body-parser
server.use( bodyParser.urlencoded({ extended: false }) );

// Also tell express to recognize JSON
server.use( bodyParser.json() );

// Also tell express to read HTTP form data
server.use(expressFormData.parse());

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