import { Router } from "express";
import {
  addProduct,
  countProducts,
  deleteProduct,
  getProducts,
  replaceProduct,
  updateProduct,
} from "../controllers/products.js";
import {
  localUpload,
  productImageUpload,
  productPicturesUpload,
  remoteUpload,
} from "../middlewares/upload.js";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";

// create product router
const productsRouter = Router();

//define routes
productsRouter.post(
  "/products",
  isAuthenticated,
  // productImageUpload.single("image"),
  productPicturesUpload.array("pictures", 3),
  addProduct
);

productsRouter.get("/products", getProducts);

productsRouter.get("/products/count", countProducts);

productsRouter.patch(
  "/products/:id",
  isAuthenticated,
  productPicturesUpload.array("pictures", 3),
  updateProduct
);

productsRouter.put(
  "/products/:id",
  isAuthenticated,
  isAuthorized(["superadmin", "admin"]),
  productPicturesUpload.array("pictures", 3),
  replaceProduct
);

productsRouter.delete("/products/:id", isAuthenticated, deleteProduct);

//export router
export default productsRouter;
