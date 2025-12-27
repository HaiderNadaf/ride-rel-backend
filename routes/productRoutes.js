import express from "express";
import { upload } from "../middleware/upload.js";

import {
  getProducts,
  getProductById,
  getProductsByCategory,
  createProduct,
} from "../controllers/productController.js";

const router = express.Router();

// GET ALL
router.get("/", getProducts);

// GET BY CATEGORY
router.get("/category/:category", getProductsByCategory);

// GET BY ID
router.get("/:id", getProductById);

// CREATE (AI + Cloudinary)
router.post("/create", upload.single("image"), createProduct);

export default router;
