const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");
const Invoice = require("../models/Invoice");

router.get("/fetchallinvoice", fetchuser, async (req, res) => {
  try {
    const invoice = await Invoice.find({ user: req.user.id });

    res.json(invoice);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error Occuried!");
  }
});

router.post("/addinvoice",fetchuser,[
    body("invoiceNumber", "Enter the valid invoice Number").isNumeric(),
    body("customerName", "Enter the vaild Name").isLength({ min: 3 }),
    
    body("customerMobileNo", "Enter the valid Mobile Number").isNumeric(),
    body("customerAddress", "Enter the valid Address").isLength({ min: 3 }),
  ], async (req, res) => {
    try {
      const {
        invoiceNumber,
        customerName,
        
        customerMobileNo,
        customerAddress,
        items,
        totalAmount,
        date
      } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const invoice = new Invoice({
        invoiceNumber,
        customerName,
        
        customerMobileNo,
        customerAddress,
        items,
        totalAmount,
        date,
        user: req.user.id,
      });
      const saveInvoice = await invoice.save();
      res.json(saveInvoice);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error Occuried!");
    }
  }
);

router.put('/updateinvoice/:id', fetchuser, async (req, res) => {
  try {
      // Create a newinvoiceCus object
    const invoiceId = req.params.id;

    // Check if the invoice with the given ID exists
    const existingInvoice = await Invoice.findById(invoiceId);

    if (!existingInvoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    // Update the invoice details based on the request body
    const {
      invoiceNumber,
      customerName,
      
      customerMobileNo,
      customerAddress,
      items,
      totalAmount
    } = req.body;

    existingInvoice.invoiceNumber = invoiceNumber || existingInvoice.invoiceNumber;
    existingInvoice.customerName = customerName || existingInvoice.customerName;
    
    existingInvoice.customerMobileNo = customerMobileNo || existingInvoice.customerMobileNo;
    existingInvoice.customerAddress = customerAddress || existingInvoice.customerAddress;
    existingInvoice.items = items || existingInvoice.items;
    existingInvoice.totalAmount = totalAmount || existingInvoice.totalAmount;
    
    if (existingInvoice.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
  }
    // Save the updated invoice to the database
    await existingInvoice.save();
    res.json({ existingInvoice });
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
})
router.delete('/deleteinvoice/:id', fetchuser, async (req, res) => {
  try {     
    const invoiceId = req.params.id;
    // Check if the invoice with the given ID exists
    const existingInvoice = await Invoice.findById(invoiceId);

    if (!existingInvoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    if (existingInvoice.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
  }
    // Delete the invoice from the database
  await Invoice.deleteOne({ _id: existingInvoice._id });

  res.json({ message: 'Invoice deleted successfully', deletedInvoice: existingInvoice });

  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
})
module.exports = router;
