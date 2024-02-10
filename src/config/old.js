require('dotenv').config();

const { Pool } = require('pg');
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.HOST_NAME,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    waitForConnection: true,
    connectionLimit: 10,
    queueLimit: 0

});

module.exports = pool;