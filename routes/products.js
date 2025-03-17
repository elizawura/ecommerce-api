import { Router } from "express";
import {
  addProduct,
  countProducts,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/products.js";
import {
  localUpload,
  productImageUpload,
  productPicturesUpload,
  remoteUpload,
} from "../middlewares/upload.js";

// create product router
const productsRouter = Router();

//define routes
productsRouter.post(
  "/products",
  // productImageUpload.single("image"),
  productPicturesUpload.array("pictures", 3),
  addProduct
);

productsRouter.get("/products", getProducts);

productsRouter.get("/products/count", countProducts);

productsRouter.patch("/products/:id", updateProduct);

productsRouter.delete("/products/:id", deleteProduct);

//export router
export default productsRouter;
