const express = require('express');
const router = express.Router()
const ProductsModel = require("../models/ProductsModel")

// http://localhost:3002/products/

//Product listing
router.get(
    '/list',
    (req, res) => {

        ProductsModel
        .find()
        .then(
            (dbDocuments) => {
                res.send(dbDocuments)
            }
        )
        .catch(
            (error) => {
                console.log(error)
            })
    });

// Product Creation
router.post(
    '/',
    (req, res) => {
        // Capture the data in the BODY section
        const formData = {
            brand: req.body.brand,
            model: req.body.model,
            price: req.body.price,
            warranty: req.body.warranty,
            origin: req.body.origin
        }
        // Instantiate an instance of the ProductsModel constructor
        const newProductModel = new ProductsModel(formData)
        // Using newProductModel object to save to the database
        newProductModel
        .save()
        //  If promise resolves....
        .then(
            (dbDocument) => {
                res.send(dbDocument)
            }
        )

        // If promise rejects...
        .catch(
            (error) => {
                console.log(error)
            })
    })  

//Product update
router.post(
    '/update',
    (req, res) => {

        ProductsModel
        .findOneAndUpdate(
            {
                'model': 'S10'
            },
            {
                $set: {
                    price: 4000
                }
            }
        )
        .then(
            (dbDocument) => {
                res.send(dbDocument)
            }
        )
        .catch(
            (error) => {
                console.log(dbDocument)
            }
        )

    }
)

module.exports = router;