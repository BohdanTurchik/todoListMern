import mongoose from "mongoose";
 const connect = mongoose.connect;

import { mongoUrl } from "../consts/index.js";

const connectDB = async () => {
  try {
    const mongoURI = mongoUrl;
    const options = {
      useNewUrlParser: true,
      
      useUnifiedTopology: true,
    };
    await connect(mongoURI, options);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err)
    process.exit(1);
  }
};

export default connectDB;
