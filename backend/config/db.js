import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Database is connected at ${con.connection.host}`);
  } catch (err) {
    console.log(`Error while connecting to DB ${err}`);
  }
};

export default connectDB;
