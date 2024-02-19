const pool = require('../config/database');
const { getAllUsers, getUserById, updateUserById, deleteUserById } = require('../services/CRUDService');
const User = require('../models/users')
const getHomepage = async (req, res) => {
    let rows = await User.find({});
    return res.render('home.ejs', { listUsers: rows })
};

const getABC = (req, res) => {
    res.send('check abc');
};

const getHoiDanIT = (req, res) => {
    res.render('sample.ejs');

};
const postCreateUser = async (req, res) => {
    let email = req.body.email;
    let name = req.body.name;
    let city = req.body.city;
    User.create({
        name: name,
        email: email,
        city: city
    })

    res.send('create users success');

}

const getCreatePage = (req, res) => {
    res.render('create.ejs');
}

const getUpdatePage = async (req, res) => {
    const userId = req.params.id;
    // let user = await getUserById(userId);
    let user = await User.findById(userId).exec();
    res.render('update.ejs', { userEdit: user });
};

const postUpdateUser = async (req, res) => {
    let email = req.body.email;
    let name = req.body.name;
    let city = req.body.city;
    let userId = req.body.userId;

    console.log(">>> email = ", email, " name = ", name, " city = ", city, " id = ", userId);
    //await updateUserById(email, name, city, userId);
    await User.updateOne({ _id: userId }, { name: name, city: city, email: email });
    res.redirect('/');
}
const postDeleteUser = async (req, res) => {
    const userId = req.params.id;
    let user = await User.findById(userId).exec();
    res.render('delete.ejs', { userEdit: user })
}
const postHandleRemoveUser = async (req, res) => {
    const id = req.body.userId; // Đổi từ req.params.userId sang req.params.id
    //await deleteUserById(id);
    await User.deleteOne({ _id: id });
    res.redirect('/');
};


module.exports = {
    getHomepage,
    getABC,
    getHoiDanIT,
    postCreateUser,
    getCreatePage,
    getUpdatePage,
    postUpdateUser,
    postDeleteUser,
    postHandleRemoveUser
};
