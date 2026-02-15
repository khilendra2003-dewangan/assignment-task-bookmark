import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}`, {
      dbName: "BookMark",
    });
    console.log("mongodb connected sucessfully");
  } catch (error) {
    console.log(error.message);
    console.log("mongodb not connected");
  }
};

export default connectDB;
