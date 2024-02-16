const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const APIController = require('../controllers/apiController')

const initAPIRoute = () => {
    router.get('/users', APIController.getAllUsers);
    router.post('/create-user-api', APIController.createNewUser); // method POST -> CREATE data
    router.post('/update-user-api', APIController.updateUser); //method PUT -> UPDATE data
    router.post('/delete-user-api/:id', APIController.deleteUser); //method DELETE -> DELETE data
    return router;
}

module.exports = initAPIRoute;
