import {
  createProduct,
  gettingProducts,
  updateProduct,
  deleteProduct,
  getProduct,
} from "../controllers/productController.js";

import express from "express";

import { uploadingImages } from "../middleware/imageUploadMW.js";
import upload from "../utils/multerconfig.js";

const router = express.Router();

router.post(
  "/create",
  upload.any("images", 12),
  uploadingImages,
  createProduct,
);
router.get("/get", gettingProducts);
router.get("/get/:categoryId", gettingProducts);
router.get("/get/:id", getProduct);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);

export default router;
