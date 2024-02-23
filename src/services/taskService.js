const Task = require('../models/task')
const aqp = require('api-query-params');

const createService = async (data) => {
    try {
        console.log('get data', data);
        let result = await Task.create({
            name: data.name,
            description: data.description,
            status: data.status,
            startDate: data.startDate,
            endDate: data.endDate

        })
        return result;
        console.log(">>> result: ", result);
    } catch (error) {
        console.log(">>> error", error);
        return null;
    }
}
const getService = async (queryString, limit, page) => {
    try {
        let offset = (page - 1) * limit;
        let { filter } = aqp(queryString);
        delete filter.page;
        //console.log(">>> check : ", filter)
        let result = await Task.find(filter).limit(limit).skip(offset).exec();
        return result;
        console.log(">>> result: ", result);
    }
    catch (error) {
        console.log(">>> error", error);
        return null;
    }

}
const updateService = async (req, res) => {
    try {
        let data = req.body;
        console.log(">>> check data", data);
        result = await Task.updateOne(
            { _id: data.id },
            { ...data }
        )
        return result
    } catch (error) {
        console.log(">>> error: ", error);
    }
}
const deleteService = async (data) => {
    try {
        let id = data.id;
        await Task.deleteById({ _id: id });
    }
    catch (error) {
        console.log(">>> error: ", error);
    }
}
module.exports = {
    createService,
    getService,
    deleteService, updateService
}