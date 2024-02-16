require('dotenv').config();

const express = require('express')
const path = require('path');

const configViewEngine = require('./config/viewEngine');
const webRoutes = require('./routes/web');
const postgres = require('postgres');
const pool = require('./config/database')
const initAPIRoute = require('./routes/api');

const app = express()
const port = process.env.PORT;
const hostname = process.env.HOST_NAME;

app.use(express.json()) // for json
app.use(express.urlencoded({ extended: true })) // for form data


configViewEngine(app);
app.use('/', webRoutes);
app.use('/api/v1', initAPIRoute());
//app.use(express.static('public'))
// khai báo route

// pool.query('SELECT * FROM Users', (err, res) => {
//     if (err) {
//         console.error('Error executing query', err);
//         return;
//     }

//     console.log('>>> Results:', res.rows);
// });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})