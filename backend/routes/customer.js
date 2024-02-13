const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");
const Customer = require("../models/Customer");

router.get("/fetchallcustomer", fetchuser, async (req, res) => {
  try {
    const costomer = await Customer.find({ user: req.user.id });

    res.json(costomer);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error Occuried!");
  }
});

router.post("/addcustomer",fetchuser,[
    body("customerName", "Enter the vaild Name").isLength({ min: 3 }),
    body("customerEmail", "Enter the valid Email").isLength({ min: 3 }),
    body("customerMobileNo", "Enter the valid Mobile Number").isNumeric(),
    body("customerAddress", "Enter the valid Address").isLength({ min: 3 }),
  ], async (req, res) => {
    try {
      const { customerName,customerEmail,customerMobileNo,customerAddress } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const customer = new Customer({
        customerName,
        customerEmail,
        customerMobileNo,
        customerAddress,
        user: req.user.id,
      });
      const saveCustomer = await customer.save();
      res.json(saveCustomer);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error Occuried!");
    }
  }
);

router.put('/updatecustomer/:id', fetchuser, async (req, res) => {
  const { customerName,customerEmail,customerMobileNo,customerAddress } = req.body;
  try {
      // Create a newcustomer object
      const newCustomer = {};
      if (customerName) { newCustomer.customerName = customerName };
      if (customerEmail) { newCustomer.customerEmail = customerEmail};
      if (customerMobileNo) { newCustomer.customerMobileNo = customerMobileNo };
      if (customerAddress) { newCustomer.customerAddress =customerAddress };

      // Find the customer to be updated and update it
      let customer = await Customer.findById(req.params.id);
      if (!customer) { return res.status(404).send("Not Found") }

      if (customer.user.toString() !== req.user.id) {
          return res.status(401).send("Not Allowed");
      }
      customer = await Customer.findByIdAndUpdate(req.params.id, { $set: newCustomer }, { new: true })
      res.json({ customer });
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
})
router.delete('/deletecustomer/:id', fetchuser, async (req, res) => {
  const {customerName,customerEmail,customerMobileNo,customerAddress } = req.body;
  try {     
      // Find the customer to be updated and update it
      let customer = await Customer.findById(req.params.id);
      if (!customer) { return res.status(404).send("Not Found") }

      if (customer.user.toString() !== req.user.id) {
          return res.status(401).send("Not Allowed");
      }
      customer = await Customer.findByIdAndDelete(req.params.id)
      res.json({"Sucess":"customers id Deleted",customer:customer});
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
})
module.exports = router;
