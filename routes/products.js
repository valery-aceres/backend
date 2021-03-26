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
            _id: req.body._id,
            title: req.body.title,
            // src: req.body.src,
            // src2: req.body.src2,
            // src3: req.body.src3,
            os: req.body.os,
            ram: req.body.ram,
            brand: req.body.brand,
            dimension: req.body.dimension,
            box: req.body.box,
            weight: req.body.weight,
            model: req.body.model,
            description: req.body.description,
            discount: req.body.discount,
            price: req.body.price,
            colors: req.body.colors,
            count: req.body.count
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