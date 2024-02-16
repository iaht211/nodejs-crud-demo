const pool = require('../config/database')

const getAllUsers = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
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

const createNewUser = async (req, res) => {
    try {
        let email = req.body.email;
        let name = req.body.name;
        let city = req.body.city;
        console.log(">>> email = ", email, " name = ", name, " city = ", city);


        const query = 'INSERT INTO Users (email, name, city) VALUES ($1, $2, $3)';
        const result = await pool.query(query, [email, name, city]);
        return res.status(201).json({
            message: 'User created successfully'
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
        const result = await pool.query('UPDATE users SET email = $1, name = $2, city = $3 WHERE id = $4;', [email, name, city, id]);
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
        const userId = req.params.id;
        const result = await pool.query('DELETE FROM users WHERE id = $1;', [userId]);
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



module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}