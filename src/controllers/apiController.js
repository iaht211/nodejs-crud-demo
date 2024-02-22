const pool = require('../config/database')
const User = require('../models/user')
const { uploadSingleFile, uploadMultiFiles } = require('../services/fileService')
const getAllUsers = async (req, res) => {
    try {
        const result = await User.find({})
        return res.status(200).json({
            message: 'ok',
            data: result
        });
    } catch (error) {
        console.log('error fetching users:', error);
        return res.status(500).json({
            message: 'internal server error'
        });
    }
};

const createNewUser = async (req, res) => {
    try {
        let email = req.body.email;
        let name = req.body.name;
        let city = req.body.city;
        console.log(">>> email = ", email, " name = ", name, " city = ", city);
        const result = await User.create({
            name: name,
            email: email,
            city: city
        })
        return res.status(201).json({
            message: 'User created successfully',
            data: result
        });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const { email, name, city, id } = req.body;
        const result = await User.updateOne({ _id: id }, { name: name, city: city, email: email });
        return res.status(200).json({
            message: 'ok',
            data: result.rows
        });
    } catch (error) {
        console.log('error fetching users:', error);
        return res.status(500).json({
            message: 'internal server error'
        });
    }
};
const deleteUser = async (req, res) => {
    try {
        const userId = req.body.id;
        console.log(">>> check user id :", userId)
        let result = await User.deleteOne({ _id: userId });
        return res.status(200).json({
            message: 'ok',
            data: result.rows
        });
    } catch (error) {
        console.log('error fetching users:', error);
        return res.status(500).json({
            message: 'internal server error'
        });
    }
};
const postUploadSingleFileAPI = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    let result = await uploadSingleFile(req.files.image)
    console.log(">>> check result: ", result)

    return res.send('ok single')
}
const postUploadMultipleFileAPI = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    if (Array.isArray(req.files.image)) {
        let result = await uploadMultiFiles(req.files.image)
        return res.status(200).json({
            EC: 0,
            data: result
        })
    }
    else {
        return await postUploadSingleFileAPI(req, res);
    }
}


module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser, postUploadSingleFileAPI,
    postUploadMultipleFileAPI
}