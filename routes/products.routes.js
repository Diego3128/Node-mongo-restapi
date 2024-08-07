import Router from "express";
const router = Router();
// import controllers
import {
  getProducts,
  getProductId,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controllers.js";

import fileUpload from "express-fileupload";
// The routes start with /products/.....
router.get("/", getProducts);

router.get("/:id", getProductId);

router.post(
  "/",
  fileUpload({ useTempFiles: true, tempFileDir: "./uploads" }),
  createProduct,
);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

export default router;
