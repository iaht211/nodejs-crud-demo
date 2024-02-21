const { uploadSingleFile } = require("../services/fileService")
const { createCustomerService, createArrCustomerService, getAllCustomersService, updateCustomerService, deleteACustomerService, deleteArrCustomerService } = require("../services/customerService")
module.exports = {
    postCreateCustomer: async (req, res) => {
        let { name, address, phone, email, image, description } = req.body;
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