//Import mongoose 
const mongoose = require('mongoose');


// Schema
const ProductsSchema = new mongoose.Schema(
    {
        brand: {
            type: String,
            required: true
        },
        model: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        }
    }
)

// Model 
const ProductsModel = mongoose.model("products", ProductsSchema);

// Export 
module.exports = ProductsModel;