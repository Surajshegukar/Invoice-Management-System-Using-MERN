const mongoose = require('mongoose');
const {Schema} = mongoose;

const CustomerSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    
    customerName:{
        type: String,
        required : true
    },
    customerEmail:{
        type: String,
        
    },
    customerMobileNo:{
        type: Number,
        required : true
    },
    customerAddress:{
        type: String,
        required : true
    }
});
const Customer = mongoose.model('Customer',CustomerSchema);
module.exports = Customer;