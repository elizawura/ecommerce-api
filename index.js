import express from "express";
import productsRouter from "./routes/products.js";

//create an express app
const app = express();

//use route
app.use(productsRouter);

//listen for incoming request
app.listen(3000, () => {
  console.log("server listening on port 3000");
});
