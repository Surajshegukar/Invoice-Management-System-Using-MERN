const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");
const Product = require("../models/Product");

router.get("/fetchallproduct", fetchuser, async (req, res) => {
  try {
    const product = await Product.find({ user: req.user.id });

    res.json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error Occuried!");
  }
});

router.post("/addproduct",fetchuser,[
    body("productName", "Enter the vaild Name").isLength({ min: 3 }),
    body("productPrice", "Enter the valid Price").isNumeric(),
  ], async (req, res) => {
    try {
      const { productName,productPrice } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const product = new Product({
        productName,
        productPrice,
        user: req.user.id,
      });
      const saveProduct = await product.save();
      res.json(saveProduct);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error Occuried!");
    }
  }
);

router.put('/updateproduct/:id', fetchuser, async (req, res) => {
  const { productName,productPrice } = req.body;
  try {
      // Create a newproduct object
      const newProduct = {};
      if (productName) { newProduct.productName = productName };
      if (productPrice) { newProduct.productPrice = productPrice};
      

      // Find the product to be updated and update it
      let product = await Product.findById(req.params.id);
      if (!product) { return res.status(404).send("Not Found") }

      if (product.user.toString() !== req.user.id) {
          return res.status(401).send("Not Allowed");
      }
      product = await Product.findByIdAndUpdate(req.params.id, { $set: newProduct }, { new: true })
      res.json({ product });
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
})
router.delete('/deleteproduct/:id', fetchuser, async (req, res) => {
  try {     
      // Find the product to be updated and update it
      let product = await Product.findById(req.params.id);
      if (!product) { return res.status(404).send("Not Found") }

      if (product.user.toString() !== req.user.id) {
          return res.status(401).send("Not Allowed");
      }
      product = await Product.findByIdAndDelete(req.params.id)
      res.json({"Sucess":"products id Deleted",product:product});
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
})
module.exports = router;
