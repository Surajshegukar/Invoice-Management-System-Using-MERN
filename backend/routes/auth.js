const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
const JWT_Secret = "ThisSecure";
var fetchuser = require('../middleware/fetchuser');

//create user
router.post('/',[
    body('name',"Enter the vaild name").isLength({min:3}),
    body('email',"Enter the vaild email").isEmail(),
    body('password',"Enter the vaild password").isLength({min:5})
],async (req,res)=>{
    //iff there is error,return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
      //check wheater the user with this email exists already
      let user = await User.findOne({email: req.body.email});
      if(user){
        return res.status(400).json({error: "the user is exist"})
    
      }
      const salt = await bcrypt.genSalt(10);
      secPass = await bcrypt.hash(req.body.password,salt);
      user = await User.create({
          name:req.body.name,
          password:secPass,
          email:req.body.email,
        
        })
        const data = {
          user:{
            id:user.id
          }
        }
        const authtoken = jwt.sign(data,JWT_Secret);
        
        res.json({authtoken});
    }catch(error){
      console.log(error.message);
      res.status(500).send("Some Error Occuried!");
    }
      
    
})
router.post('/login',[
  body('email',"Enter the vaild email").isEmail(),
  body('password',"Enter the vaild password").exists()
], async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email,password} =req.body;
    try{
      let user = await User.findOne({email});
      if(!user){
        return res.status(400).json({error:"Please try to login with correct creditions"});
      }
      const passwordCompare = await bcrypt.compare(password,user.password);
      if(!passwordCompare){
        return res.status(400).json({error:"Please try to login with correct creditions"});

      }
      const data = {
        user:{
          id: user.id
        }
      }
      const authtoken = jwt.sign(data,JWT_Secret); 
      res.json({authtoken});
    }catch(error){
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  });

router.post('/getuser',fetchuser, async (req,res)=>{
try{
  const user_id = req.user.id;
  const user = await User.findById(user_id).select("-password");
  res.send(user);

}catch(error){
  console.log(error.message);
  res.status(500).send("Internal Server Error");
}
});

module.exports = router;