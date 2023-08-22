import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/MongoDb.js";
import ImportData from "./Dataimport.js";
import productRoute from "./Routes/ProductRoute.js";
import { errorHandler, notFound } from "./Middleware/Errors.js";
import userRoutes from "./Routes/UserRoutes.js";
import orderRoute from "./Routes/orderRoute.js";

connectDb();
dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/import", ImportData);
app.use("/api/product", productRoute);
app.use("/api/users", userRoutes);
app.use("/api/order", orderRoute);
// error handler
app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.json("API is running....");
});

const PORT = process.env.PORT || 1000;
app.listen(PORT, console.log(`server runing.. port ${PORT}`));
