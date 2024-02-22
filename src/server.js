require('dotenv').config();

const express = require('express')
const configViewEngine = require('./config/viewEngine');
const webRoutes = require('./routes/web');
const { connection } = require('./config/database');
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload');
const { MongoClient } = require('mongodb');

const app = express()
const initAPIRoute = require('./routes/api')
const port = process.env.PORT;
const hostname = process.env.HOST_NAME;

//config file upload
app.use(fileUpload());


app.use(express.json()) // for json
app.use(express.urlencoded({ extended: true })) // for form data


configViewEngine(app);
app.use('/', webRoutes);
app.use('/api/v1', initAPIRoute());

// const cat = new Kitten({ name: 'hoi dan it model' });
// cat.save();


(async () => {
    try {
        // using mongodb
        const url = process.env.DB_HOST_WITH_DIRVER;
        const client = new MongoClient(url);
        // Database Name
        const dbName = process.env.DB_NAME;
        await client.connect();
        console.log('Connected successfully to server');
        const db = client.db(dbName);

        await connection();
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    }
    catch (error) {
        console.log(">>> error connnection", error)
    }

})()

