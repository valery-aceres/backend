//Import mongoose 
const mongoose = require('mongoose');


// Schema
const ProductsSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        src: {
            type: String,
            // required: true
        },
        src2: {
            type: String,
            // required: true
        },
        src3: {
            type: String,
            // required: true
        },
        os: {
            type: String,
            required: true
        },
        ram: {
            type: String,
            required: true
        },
        brand: {
            type: String,
            required: true
        },
        dimension: {
            type: String,
            required: true
        },
        box: {
            type: String,
            required: true
        },
        weight: {
            type: String,
            required: true
        },
        model: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        discount: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        colors: {
            type: String,
            required: true
        },
        count: {
            type: Number,
            required: true
        }
    }
)

// Model 
const ProductsModel = mongoose.model("products", ProductsSchema);

// Export 
module.exports = ProductsModel;