import Product from "../models/Product.js";
import { sendNotification } from "../utils/sendNotification.js";

// GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  try {
    const data = await Product.find();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ⭐ GET PRODUCT BY ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ⭐ FILTER PRODUCTS BY CATEGORY
export const getProductsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const data = await Product.find({ category });

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// export const createProduct = async (req, res) => {
//   try {
//     const product = await Product.create(req.body);

//     res.status(201).json({
//       success: true,
//       message: "✅ Product created successfully",
//       data: product,
//     });
//   } catch (err) {
//     res.status(400).json({
//       success: false,
//       message: "❌ Failed to create product",
//       error: err.message,
//     });
//   }
// };

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    // ✅ PUSH NOTIFICATION
    await sendNotification(
      "🚗 New Vehicle Added",
      `${product.text} has just been listed`
    );

    res.status(201).json({
      success: true,
      message: "✅ Product created successfully",
      data: product,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "❌ Failed to create product",
      error: err.message,
    });
  }
};
