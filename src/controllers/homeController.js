const pool = require('../config/database');
const { getAllUsers, getUserById, updateUserById, deleteUserById } = require('../services/CRUDService');
const getHomepage = async (req, res) => {
    let rows = await getAllUsers();
    console.log('>> check rows: ', rows);
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
    console.log(">>> email = ", email, " name = ", name, " city = ", city);


    const query = 'INSERT INTO Users (email, name, city) VALUES ($1, $2, $3)';
    const result = await pool.query(query, [email, name, city]);

    console.log(result);
    res.send('create users success');

}

const getCreatePage = (req, res) => {
    res.render('create.ejs');
}

const getUpdatePage = async (req, res) => {
    const userId = req.params.id;
    let user = await getUserById(userId);
    res.render('update.ejs', { userEdit: user });
};

const postUpdateUser = async (req, res) => {
    let email = req.body.email;
    let name = req.body.name;
    let city = req.body.city;
    let userId = req.body.userId;

    console.log(">>> email = ", email, " name = ", name, " city = ", city, " id = ", userId);
    await updateUserById(email, name, city, userId);
    res.redirect('/');
}
const postDeleteUser = async (req, res) => {
    const userId = req.params.id;
    let user = await getUserById(userId);
    res.render('delete.ejs', { userEdit: user })
}
const postHandleRemoveUser = async (req, res) => {
    const id = req.body.userId; // Đổi từ req.params.userId sang req.params.id
    await deleteUserById(id);
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
