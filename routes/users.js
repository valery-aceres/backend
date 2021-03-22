const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const UsersModel = require('../models/UsersModel');

// create signup/registration route
router.post(
    '/signup',    // https://www.myapp.com/users/signup
    (req, res) => {
        // 1. capture user accnt details 
        const formData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            phoneNumber: req.body.phoneNumber,
            dobField: req.body.dobField,
            addressField: req.body.addressField,
        };
        // 2. Create newUsersModel for saving the collection 
        const newUsersModel = new UsersModel (formData)
        // 3. Check that no other doc has the same email 
        UsersModel
        .findOne({ email: formData.email})
        .then(
            (dbDocument) => {
                // if email exists
                if(dbDocument) {
                    res.send("An account with that email already exists. Please login.");
                }
                    // then reject registration 
                // if email does not exist
                else {
                    // 4. Generate a salt 
                    bcryptjs.genSalt(
                        (err, theSalt) => {
                    // 5. With the salt and users pw, Encrypt the user's password
                            bcryptjs.hash(
                                formData.password, theSalt, (err, theEncryption) => {
                    // 6. Replace the password with the encryption
                                    newUsersModel.password = theEncryption;
                     // 7. We will save user to collection 
                                        newUsersModel
                                        .save()
                                        .then(
                                            (dbDocument) => {
                                                res.send("Account created successfully!")
                                            }
                                        )
                                        .catch(
                                            (error) => {
                                                console.log(error)
                                            });
                                })
                        })
                    }
            }) 
    });
// Create a login route
router.post(
    '/login', (req, res) => { // https://www.myapp.com/users/login
        // Capture user accnt details 
        UsersModel
        .find({ email: req.body.email})
        .then(dbDocument => {
            // if email doesnt exist
                if (dbDocument.length < 1) {
                    res.send("Invalid Email or Password")
                }
            // Compare plain text pw and hash pw 
                bcryptjs.compare(req.body.password, dbDocument[0].password, (err, result) => {
                    if (err) {
                        res.send("Authentication Failed")
                    }
                    if (result) {
                        res.send("Login Successful")
                    }
                    res.send("Invalid Email or Password")

                })
            .catch(err => {
                    console.log(error);
                });
        });
})    


//User update
router.post(
    '/update',
    (req, res) => {

        UsersModel
        .findOneAndUpdate(
            {
                'email': 'seyi@yahoo.com'
            },
            {
                $set: {
                    phoneNumber: "0501234567"
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