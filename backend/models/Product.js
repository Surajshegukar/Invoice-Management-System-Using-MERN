const mongoose = require('mongoose');
const {Schema} = mongoose;


// Product {
// 1. Product Id
// 2. Product Name
// 3.  Product Price
// }

const ProductSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    
    productName : {
        type : String,
        required : true
    },
    productPrice : {
        type : Number,
        required: true
    }
});
const Product = mongoose.model('Product',ProductSchema);

module.exports = Product;