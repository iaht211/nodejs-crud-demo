require('dotenv').config();

const express = require('express')
const configViewEngine = require('./config/viewEngine');
const webRoutes = require('./routes/web');
const { connection } = require('./config/database');
const mongoose = require('mongoose')
const app = express()
const port = process.env.PORT;
const hostname = process.env.HOST_NAME;
app.use(express.json()) // for json
app.use(express.urlencoded({ extended: true })) // for form data


configViewEngine(app);
app.use('/', webRoutes);
// app.use('/api/v1', initAPIRoute());

// const cat = new Kitten({ name: 'hoi dan it model' });
// cat.save();


(async () => {
    try {
        // test db
        await connection();
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    }
    catch (error) {
        console.log(">>> error connnection", error)
    }

})()

