const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name: { type: String, require: true },
    address: String,
    phone: String,
    email: String,
    image: String,
    desciption: String,

}, { timestamps: true });
const Customer = mongoose.model('Customer', userSchema);

module.exports = Customer
