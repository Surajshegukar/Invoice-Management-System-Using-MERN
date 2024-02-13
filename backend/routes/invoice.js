// const express = require("express");
// const router = express.Router();
// const { body, validationResult } = require("express-validator");
// const fetchuser = require("../middleware/fetchuser");
// const Invoice = require("../models/Invoice");

// router.get("/fetchallinvoice", fetchuser, async (req, res) => {
//   try {
//     const invoice = await Invoice.find({ user: req.user.id });

//     res.json(invoice);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).send("Internal Server Error Occuried!");
//   }
// });

// router.post("/addinvoice",fetchuser,[
//     body("invoiceCusName", "Enter the vaild Name").isLength({ min: 3 }),
//     body("invoicecCusEmail", "Enter the valid Email").isLength({ min: 3 }),
//     body("invoicecCusMobileNo", "Enter the valid Mobile Number").isNumeric(),
//     body("invoicecCusAddress", "Enter the valid Address").isLength({ min: 3 }),
//   ], async (req, res) => {
//     try {
//       const { invoiceCusName,invoiceCusEmail,invoiceCusMobileNo,invoiceCusAddress } = req.body;
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }
//       const invoice = new Invoice({
//         invoiceCusName,
//         invoiceCusEmail,
//         invoiceCusMobileNo,
//         invoiceCusAddress,
//         user: req.user.id,
//       });
//       const saveInvoice = await invoice.save();
//       res.json(saveInvoice);
//     } catch (error) {
//       console.log(error.message);
//       res.status(500).send("Internal Server Error Occuried!");
//     }
//   }
// );

// router.put('/updateinvoice/:id', fetchuser, async (req, res) => {
//   const { invoiceCusName,invoiceCusEmail,invoiceCusMobileNo,invoiceCusAddress } = req.body;
//   try {
//       // Create a newinvoiceCus object
//       const newInvoice = {};
//       if (invoiceCusName) { newInvoice.customerName = customerName };
//       if (invoiceCusEmail) { newInvoice.customerEmail = customerEmail};
//       if (invoiceCusMobileNo) {newInvoice.customerMobileNo = customerMobileNo };
//       if (invoiceCusAddress) {newInvoice.customerAddress =customerAddress };

//       // Find the customer to be updated and update it
//       let customer = await Customer.findById(req.params.id);
//       if (!customer) { return res.status(404).send("Not Found") }

//       if (customer.user.toString() !== req.user.id) {
//           return res.status(401).send("Not Allowed");
//       }
//       customer = await Customer.findByIdAndUpdate(req.params.id, { $set: newCustomer }, { new: true })
//       res.json({ customer });
//   } catch (error) {
//       console.error(error.message);
//       res.status(500).send("Internal Server Error");
//   }
// })
// router.delete('/deletecustomer/:id', fetchuser, async (req, res) => {
//   const {customerName,customerEmail,customerMobileNo,customerAddress } = req.body;
//   try {     
//       // Find the customer to be updated and update it
//       let customer = await Customer.findById(req.params.id);
//       if (!customer) { return res.status(404).send("Not Found") }

//       if (customer.user.toString() !== req.user.id) {
//           return res.status(401).send("Not Allowed");
//       }
//       customer = await Customer.findByIdAndDelete(req.params.id)
//       res.json({"Sucess":"customers id Deleted",customer:customer});
//   } catch (error) {
//       console.error(error.message);
//       res.status(500).send("Internal Server Error");
//   }
// })
// module.exports = router;
