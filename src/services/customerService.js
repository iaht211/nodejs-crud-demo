const Customer = require("../models/customer")
const aqp = require('api-query-params');


const createCustomerService = async (customerData) => {
    try {
        let result = await Customer.create({
            name: customerData.name,
            address: customerData.address,
            phone: customerData.phone,
            email: customerData.email,
            description: customerData.description,
            image: customerData.image
        })
        return result;
        console.log(">>> result: ", result);
    } catch (error) {
        console.log(">>> error", error);
        return null;
    }
}
const createArrCustomerService = async (arr) => {
    try {
        let result = await Customer.insertMany(arr);
        return result;
    } catch (error) {
        console.log("error");
    }
}
const getAllCustomersService = async (limit, page, name, queryString) => {
    try {
        let result = null;

        if (limit && page) {
            let offset = (page - 1) * limit;
            const { filter } = aqp(queryString);
            delete filter.page;
            console.log(">>> check filter: ", filter);
            console.log("check ", offset, limit);
            // result = await Customer.find({}).limit(limit).skip(offset);
            //result = await Customer.find({ name: 'thai22', address: 'hn' }).limit(limit).skip(offset);
            result = await Customer.find(filter).skip(offset).limit(limit).exec();

        } else
            result = await Customer.find({});

        return result;
    }
    catch (error) {
        console.log("error get all customer", error);
    }
}
const updateCustomerService = async (req, res) => {
    try {
        let data = req.body;
        await Customer.updateOne(
            { _id: data.id },
            {
                name: data.name,
                email: data.email,
                phone: data.phone,
                desciption: data.desciption,
                address: data.address
            }
        )
        return result = await Customer.find({ _id: data.id });
    } catch (error) {
        console.log(">>> error: ", error);
    }
}
const deleteACustomerService = async (req, res) => {
    let data = req.body;
    await Customer.deleteById({ _id: data.id });

}
const deleteArrCustomerService = async (data) => {
    try {
        await Customer.delete({ _id: { $in: data } })
    }
    catch (error) {
        console.log(">>> error: ", error);

    }
}
module.exports = {
    createCustomerService,
    createArrCustomerService,
    getAllCustomersService,
    updateCustomerService,
    deleteACustomerService, deleteArrCustomerService
}