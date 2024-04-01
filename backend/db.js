const mongoose = require("mongoose");
require("dotenv").config();
const mongodb_url = process.env.MONGODB_URL 
const connectDB = async()=>{
	try{
		const connectionInstance = await mongoose.connect(`${mongodb_url}`);
		console.log("\n MongoDB Connected ");
		// console.log(connectionInstance);
		
	}catch(error){
		console.log("MongoDB connection error",error);
		process.exit(1);
	}
}
module.exports = connectDB;