const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const APIController = require('../controllers/apiController')
const { postCreateCustomer, postCreateCustomers, getAllCustomers, updateCustomer, deleteACustomer } = require("../controllers/customerController")

const initAPIRoute = () => {
    router.get('/users', APIController.getAllUsers);
    router.post('/create-user-api', APIController.createNewUser); // method POST -> CREATE data
    router.post('/update-user-api', APIController.updateUser); //method PUT -> UPDATE data
    router.post('/delete-user-api/:id', APIController.deleteUser); //method DELETE -> DELETE data

    router.post('/file', APIController.postUploadSingleFileAPI);
    router.post('/files', APIController.postUploadMultipleFileAPI);

    router.post('/customer', postCreateCustomer);
    router.post('/customers', postCreateCustomers);
    router.get('/allcustomers', getAllCustomers);
    router.post('/update-customer-api', updateCustomer); //method PUT -> UPDATE data
    router.delete('/customer', deleteACustomer);



    return router;
}

module.exports = initAPIRoute;
