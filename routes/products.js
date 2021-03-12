const express = require('express');
const router = express.Router()
const ProductsModel = require("../models/ProductsModel")


router.get(
    '/',
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
            }
        )

    }
);

// 
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
            }
        )
// newProductModel = {
//     insert: () => {},
//     upsert: () => {},
//     delete: () => {}
// }


    }
)


router.post(
    '/update',
    (req, res) => {

        ProductsModel
        .findOneAndUpdate(
            {
                'model': 'iPhone 11'
            },
            {
                $set: {
                    price: 3000
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