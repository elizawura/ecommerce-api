import express from "express";
import productsRouter from "./routes/products.js";
import mongoose from "mongoose";

// make database connnection

await mongoose.connect(process.env.MONGO_URI);

//create an express app
const app = express();

//use global middlewares
app.use(express.json());

//use route
app.use(productsRouter);

//listen for incoming request
app.listen(3000, () => {
  console.log("server listening on port 3000");
});
