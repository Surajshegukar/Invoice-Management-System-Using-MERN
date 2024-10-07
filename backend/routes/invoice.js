const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");
const Invoice = require("../models/Invoice");

// Route 1: Fetch all invoices
router.get("/fetchallinvoice", fetchuser, async (req, res) => {
  try {
    const invoices = await Invoice.find({ user: req.user.id });
    res.json(invoices);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error Occurred!");
  }
});

// Route 2: Add a new invoice
router.post(
  "/addinvoice",
  fetchuser,
  [
    body("invoiceNumber", "Enter a valid invoice number").isNumeric(),
    body("customerName", "Customer name must be at least 3 characters long").isLength({ min: 3 }),
    body("customerMobileNo", "Enter a valid mobile number").isLength({ min: 10, max: 10 }).isNumeric(),
    body("customerAddress", "Address must be at least 3 characters long").isLength({ min: 3 }),
  ],
  async (req, res) => {
    try {
      const {
        invoiceNumber,
        customerName,
        customerMobileNo,
        customerAddress,
        items,
        totalAmount,
        date,
      } = req.body;

      // Validate the request body
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Create a new invoice
      const invoice = new Invoice({
        invoiceNumber,
        customerName,
        customerMobileNo,
        customerAddress,
        items,
        totalAmount,
        date,
        user: req.user.id, // Ensure the user ID is set
      });

      const savedInvoice = await invoice.save();
      res.json(savedInvoice);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error Occurred!");
    }
  }
);

// Route 3: Update an invoice
router.put("/updateinvoice/:id", fetchuser, async (req, res) => {
  try {
    const invoiceId = req.params.id;

    // Check if the invoice exists
    const existingInvoice = await Invoice.findById(invoiceId);
    if (!existingInvoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    // Ensure the user owns the invoice
    if (existingInvoice.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    // Update the invoice with the new values
    const {
      invoiceNumber,
      customerName,
      customerMobileNo,
      customerAddress,
      items,
      totalAmount,
    } = req.body;

    if (invoiceNumber) existingInvoice.invoiceNumber = invoiceNumber;
    if (customerName) existingInvoice.customerName = customerName;
    if (customerMobileNo) existingInvoice.customerMobileNo = customerMobileNo;
    if (customerAddress) existingInvoice.customerAddress = customerAddress;
    if (items) existingInvoice.items = items;
    if (totalAmount) existingInvoice.totalAmount = totalAmount;

    // Save the updated invoice
    await existingInvoice.save();
    res.json({ updatedInvoice: existingInvoice });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 4: Delete an invoice
router.delete("/deleteinvoice/:id", fetchuser, async (req, res) => {
  try {
    const invoiceId = req.params.id;

    // Check if the invoice exists
    const existingInvoice = await Invoice.findById(invoiceId);
    if (!existingInvoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    // Ensure the user owns the invoice
    if (existingInvoice.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    // Delete the invoice
    await Invoice.deleteOne({ _id: existingInvoice._id });
    res.json({ message: "Invoice deleted successfully", deletedInvoice: existingInvoice });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
