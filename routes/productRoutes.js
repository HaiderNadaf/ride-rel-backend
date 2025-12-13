// import express from "express";
// import {
//   getProducts,
//   getProductById,
// } from "../controllers/productController.js";

// const router = express.Router();

// // GET all
// router.get("/", getProducts);

// // ⭐ NEW: GET single product by ID
// router.get("/:id", getProductById);

// router.get("/category/:category", getProductsByCategory);

// export default router;

// import express from "express";
// import {
//   getProducts,
//   getProductsByCategory,
// } from "../controllers/productController.js";

// const router = express.Router();

// // ⭐ IMPORTANT: CATEGORY ROUTE MUST BE FIRST
// router.get("/category/:category", getProductsByCategory);

// // GET ALL PRODUCTS
// router.get("/", getProducts);

// export default router;

// import express from "express";
// import {
//   getProducts,
//   getProductById,
//   getProductsByCategory,
// } from "../controllers/productController.js";

// const router = express.Router();

// // ⭐ CATEGORY ROUTE
// router.get("/category/:category", getProductsByCategory);

// // ⭐ PRODUCT BY ID ROUTE (IMPORTANT)
// router.get("/:id", getProductById);

// // ⭐ ALL PRODUCTS ROUTE
// router.get("/", getProducts);

// export default router;
import express from "express";
import Product from "../models/Product.js";
import { sendNotification } from "../utils/sendNotification.js";

const router = express.Router();

// ✅ GET
router.get("/", async (req, res) => {
  const data = await Product.find();
  res.json({ success: true, data });
});

// ✅ POST
router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);

    await sendNotification("🚗 New Vehicle Added", product.text);

    res.status(201).json({
      success: true,
      message: "✅ Product created",
      data: product,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Create failed",
      details: err.message,
    });
  }
});

export default router;
