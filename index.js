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
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
