import mongoose from "mongoose";
import colors from 'colors';

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "backendAPI",
    })
    .then(() => console.log("Database Connected".cyan.bold))
    .catch((e) => console.log(e));
};
