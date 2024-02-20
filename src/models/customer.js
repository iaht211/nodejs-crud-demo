const mongoose = require('mongoose')
const mongoose_delete = require('mongoose-delete');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: String,
    phone: String,
    email: String,
    image: String,
    desciption: String,

}, { timestamps: true });
userSchema.plugin(mongoose_delete, { overrideMethods: 'all' });

const Customer = mongoose.model('Customer', userSchema);

module.exports = Customer
