const pool = require('../config/database');

const getAllUsers = async () => {
    const query = 'SELECT * FROM Users';
    const { rows } = await pool.query(query);
    return rows;
}
const getUserById = async (userId) => {
    const query = 'SELECT * FROM Users WHERE id = $1';
    const results = await pool.query(query, [userId]);
    console.log(results);

    let user = results.rows && results.rows.length > 0 ? results.rows[0] : {};
    return user;
}
const updateUserById = async (email, name, city, userId) => {
    const query = `UPDATE Users
    SET email = $1, name = $2, city = $3
    WHERE id = $4;`;
    const result = await pool.query(query, [email, name, city, userId]);

}
const deleteUserById = async (id) => {
    const query = `DELETE FROM Users
WHERE id = $1;`;
    const result = await pool.query(query, [id]);
}

module.exports = {
    getAllUsers, getUserById, updateUserById, deleteUserById
}