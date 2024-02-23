const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const APIController = require('../controllers/apiController')
const { postCreateCustomer, postCreateCustomers, getAllCustomers, updateCustomer, deleteACustomer, postDeleteCustomers } = require("../controllers/customerController")
const { postCreateProject, getAllProject } = require("../controllers/projectController");
const { postCreateTask, getAllTask, updateTask, deleteTask } = require('../controllers/taskController')
const { get } = require('mongoose');
const initAPIRoute = () => {
    router.get('/users', APIController.getAllUsers);
    router.post('/users', APIController.createNewUser); // method POST -> CREATE data
    router.patch('/users', APIController.updateUser); //method PUT -> UPDATE data
    router.delete('/users/:id', APIController.deleteUser); //method DELETE -> DELETE data

    router.post('/file', APIController.postUploadSingleFileAPI);
    router.post('/files', APIController.postUploadMultipleFileAPI);

    router.post('/customer', postCreateCustomer);
    router.post('/customers', postCreateCustomers);
    router.get('/allcustomers', getAllCustomers);
    router.post('/update-customer-api', updateCustomer); //method PUT -> UPDATE data
    router.delete('/customer', deleteACustomer);
    router.delete('/customers-many', postDeleteCustomers);
    router.get('/info', (req, res) => {
        let data = req.query;
        console.log(">>> data: ", data);
        res.send("ok")
    })
    router.get('/info/:name/:address', (req, res) => {
        let data = req.params;
        console.log(">>> data: ", data);
        return res.status(200).json({
            EC: 0,
            data
        })
    })

    router.post('/projects', postCreateProject);
    router.get('/projects', getAllProject);
    router.post('/tasks', postCreateTask);
    router.get('/tasks', getAllTask);
    router.put('/tasks', updateTask);
    router.delete('/tasks', deleteTask);

    return router;
}

module.exports = initAPIRoute;
