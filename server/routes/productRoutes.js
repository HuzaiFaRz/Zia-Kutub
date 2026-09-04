import {
  createProduct,
  gettingProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import express from "express";

const router = express.Router();

router.post("/create", createProduct);
router.get("/get", gettingProduct);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);

export default router;
