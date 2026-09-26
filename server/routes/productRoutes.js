import {
  createProduct,
  gettingProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import express from "express";
import { upload } from "../utils/multer.js";
import { uploadingImages } from "../middleware/imageUploadMW.js";

const router = express.Router();

router.post(
  "/create",
  upload.array("images", 12),
  uploadingImages,
  createProduct,
);
router.get("/get", gettingProduct);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);

export default router;
