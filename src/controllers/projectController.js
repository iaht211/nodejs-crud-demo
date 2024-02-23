const Project = require('../models/project');
const { createProjectService, getProjects } = require('../services/projectService')
const postCreateProject = async (req, res) => {
    let data = req.body;
    //console.log(">> check data", data);
    let result = await createProjectService(data);

    return res.status(200).json({
        EC: 0,
        data: result
    })
}
const getAllProject = async (req, res) => {
    let result = await getProjects(req.query);
    return res.status(200).json({
        EC: 0,
        data: result
    })
}
module.exports = {
    postCreateProject,
    getAllProject
}