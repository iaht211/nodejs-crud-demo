const Customer = require("../models/customer")
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
const getAllCustomersService = async () => {
    try {
        let result = await Customer.find();
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
module.exports = {
    createCustomerService,
    createArrCustomerService,
    getAllCustomersService,
    updateCustomerService,
    deleteACustomerService
}