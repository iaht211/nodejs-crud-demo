const Project = require('../models/project');
const aqp = require('api-query-params');

const createProjectService = async (data) => {
    try {
        if (data.type == "EMPTY-PROJECT") {
            let result = await Project.create(data)
            return 'create project';
        }
        if (data.type == "ADD-USER") {
            console.log(">> check data", data)
            let myProject = await Project.findById(data.projectId).exec();
            for (let i = 0; i < data.userArr.length; i++) {
                myProject.usersInfor.push(data.userArr[i]);
            }

            await myProject.save();
            console.log(myProject);
            return "ok add user";
        }
        //console.log(result);
        //return result;
    }
    catch (error) {
        console.log(">>> error: ", error);
        return null;
    }
}
const getProjects = async (queryString) => {
    let page = queryString.page;
    let { filter, limit, population } = await aqp(queryString);
    delete filter.page
    let offset = (page - 1) * limit;
    let result = await Project.find(filter).populate(population).limit(limit).skip(offset).exec();
    console.log(">>> check get data", filter);
    return result;
}
module.exports = {
    createProjectService,
    getProjects
}