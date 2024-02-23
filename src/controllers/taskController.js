const { createService, getService, deleteService, updateService } = require('../services/taskService')
const aqp = require('api-query-params');


const postCreateTask = async (req, res) => {
    let result = await createService(req.body);

    return res.status(200).json({
        EC: 0,
        data: result
    })
}
const getAllTask = async (req, res) => {

    let data = req.query;
    let limit = data.limit;
    let page = data.page;
    let result = await getService(req.query, limit, page);

    return res.status(200).json({
        EC: 0,
        data: result
    })
}
const updateTask = async (req, res) => {
    let result = await updateService(req, res);
    return res.status(200).json({
        EC: 0,
        data: result
    })
}
const deleteTask = async (req, res) => {
    let result = await deleteService(req.body);
    return res.status(200).json({
        EC: 0,
        data: result
    })
}
module.exports = {
    postCreateTask,
    getAllTask,
    updateTask, deleteTask
}