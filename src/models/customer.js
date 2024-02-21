const mongoose = require('mongoose')
const mongoose_delete = require('mongoose-delete');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: String,
    phone: String,
    email: String,
    image: String,
    desciption: String,

}, { timestamps: true }
    // ,
    //     {
    //         // Assign a function to the "statics" object of our animalSchema through schema options.
    //         // By following this approach, there is no need to create a separate TS type to define the type of the statics functions.
    //         statics: {
    //             findByName(name) {
    //                 return this.find({ name: new RegExp(name, 'i') });
    //             }
    //         }
    //     }
);
userSchema.plugin(mongoose_delete, { overrideMethods: 'all' });

const Customer = mongoose.model('Customer', userSchema);

module.exports = Customer
