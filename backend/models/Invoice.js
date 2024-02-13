const mongoose = require('mongoose');
const {Schema} = mongoose;
// User ---> customer ---> Invoice 

// Invoice {
// 1. Customer Name
// 2. Customer Address
// 3. Customer Email 
// 4. Customer Phone Number 
// 5. INVOICE NUMBER 
// 6. Date
// 7. Product Name
// 8. Product Price
// 9. Product Quantity
// 10. 
// }

// Product {
// 1. Product Id
// 2. Product Name
// 3.  Product Price
// }

const invoiceSchema = new Schema({
    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
    },
    customer: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      address: String,
    },
    items: [
      {
        product: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  

const Invoice = new mongoose.model("Invoice",InvoiceSchema);
module.exports = Invoice;