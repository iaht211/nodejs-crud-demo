const { uploadSingleFile } = require("../services/fileService")
const Joi = require('joi');
const { createCustomerService, createArrCustomerService, getAllCustomersService, updateCustomerService, deleteACustomerService, deleteArrCustomerService } = require("../services/customerService");
const { validate } = require("../models/user");
module.exports = {
    postCreateCustomer: async (req, res) => {
        let { name, address, phone, email, image, description } = req.body;

        const schema = Joi.object({
            name: Joi.string()
                .min(3)
                .max(30)
                .required(),

            address: Joi.string(),

            phone: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

            description: Joi.string(),

            email: Joi.string().email()
        })
        const result = schema.validate(req.body, { abortEarly: false });
        console.log('>>> check result:', result);
        return res.send('ok');

        let imageURL = "";
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }
        else {
            let result = await uploadSingleFile(req.files.image)
            imageURL = result.path
            console.log(">>> check valueP: ", result.path)

        }
        let customerData = {
            name, address, phone, email, description, image: imageURL,
        }
        let customer = await createCustomerService(customerData);


        return res.status(200).json({
            EC: 0,
            data: customer
        })
    },
    postCreateCustomers: async (req, res) => {
        let customers = await createArrCustomerService(req.body.customers)
        console.log(">> check data", req.body.customers)
        return res.status(200).json({
            EC: 0,
            data: customers
        })
    },
    getAllCustomers: async (req, res) => {
        console.log(">>> check", req.query)
        let limit = req.query.limit;
        let page = req.query.page;
        let name = req.query.name;
        let customers = null;
        if (limit && page) {
            customers = await getAllCustomersService(limit, page, name, req.query);
        }
        else {
            customers = await getAllCustomersService();
        }
        return res.status(200).json({
            EC: 0,
            data: customers
        })

    },
    updateCustomer: async (req, res) => {
        let customer = await updateCustomerService(req, res);
        return res.status(200).json({
            EC: 0,
            data: customer
        })
    },
    deleteACustomer: async (req, res) => {
        let customer = await deleteACustomerService(req, res);
        return res.status(200).json({
            EC: 0,
            data: customer
        })
    },
    postDeleteCustomers: async (req, res) => {
        let data = req.body.customers;
        customer = await deleteArrCustomerService(data);
        return res.status(200).json({
            EC: 0,
            data: customer
        })
    }
}