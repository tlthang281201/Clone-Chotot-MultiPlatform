import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connectDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDb;
