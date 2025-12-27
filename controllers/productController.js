import Product from "../models/Product.js";
import PushToken from "../models/PushToken.js";
import { generateCarText } from "../utils/groqAI.js";
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

// GET PRODUCT BY ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// GET PRODUCTS BY CATEGORY
export const getProductsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const data = await Product.find({ category });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// CREATE PRODUCT WITH AI + PUSH NOTIFICATION
export const createProduct = async (req, res) => {
  try {
    console.log("🔥 createProduct HIT");

    const imageUrl = req.file?.path;
    const { price, category, brand, model } = req.body;

    if (!imageUrl || !price || !category || !brand || !model) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // 🧠 AI CONTENT
    let aiData;
    try {
      aiData = await generateCarText({ price, category, brand, model });
    } catch (err) {
      console.error("❌ AI FAILED:", err.message);
      aiData = {
        description: "Vehicle listed on Ride Resell.",
        topFeatures: [],
        standOutFeatures: [],
      };
    }

    // 💾 SAVE PRODUCT
    const product = await Product.create({
      image: imageUrl,
      text: aiData.description,
      price,
      category,
      brand,
      model,
      keySpecifications: aiData.topFeatures,
      topFeatures: aiData.topFeatures,
      standOutFeatures: aiData.standOutFeatures,
    });

    // 🔔 FETCH PUSH TOKENS
    const tokens = await PushToken.find({}, { token: 1 });

    // 🔔 SEND PUSH TO ALL USERS
    for (const item of tokens) {
      console.log("📲 Sending push to:", item.token);

      await sendNotification(
        "🚗 New Vehicle Added",
        `${product.text} has just been listed`,
        item.token
      );
    }

    res.status(201).json({
      success: true,
      message: "✅ Product created",
      data: product,
    });
  } catch (err) {
    console.error("Create product error:", err);
    res.status(500).json({ error: "Failed to create product" });
  }
};
