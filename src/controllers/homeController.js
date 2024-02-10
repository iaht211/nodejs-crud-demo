const pool = require('../config/database');

const getHomepage = (req, res) => {
    return res.render('home.ejs')
};

const getABC = (req, res) => {
    res.send('check abc');
};

const getHoiDanIT = (req, res) => {
    res.render('sample.ejs');
};
const postCreateUser = (req, res) => {
    let email = req.body.email;
    let name = req.body.name;
    let city = req.body.city;
    console.log(">>> email = ", email, " name = ", name, " city = ", city);

    pool.query('INSERT INTO users (email, name, city) VALUES ($1, $2, $3)', [email, name, city], function (err, results) {
        if (err) {
            console.error('Error executing query', err);
            res.status(500).send('Error creating user');
            return;
        }
        console.log(results);
        res.send('create users success');
    });
}



module.exports = {
    getHomepage,
    getABC,
    getHoiDanIT,
    postCreateUser
};
