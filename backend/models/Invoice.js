const mongoose = require("mongoose");
const { Schema } = mongoose;

const invoiceSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  invoiceNumber: {
    type: String,
    required: true,
  },
  customerName:{
      type: String,
      required: true,
    },
  customerEmail: {
    type: String,
    required: true,

  },
  customerMobileNo: {
    type: Number,
    required: true,
  },
  customerAddress: {type:String}
  ,
  items: [
    {
      product: {
        type: String,
        
      },
      quantity: {
        type: Number,
       
      },
      price: {
        type: Number,
        
      },
    },
  ],
  totalAmount: {
    type: Number,
    
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Invoice = new mongoose.model("Invoice", invoiceSchema);
module.exports = Invoice;
