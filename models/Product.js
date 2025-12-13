import mongoose from "mongoose";

const specSchema = new mongoose.Schema({
  engine: String,
  power: String,
  torque: String,
  transmission: String,
  driveType: String,
  groundClearance: String,
});

// Main product schema
const productSchema = new mongoose.Schema({
  image: { type: String, required: true },
  text: { type: String, required: true },
  price: { type: Number, required: true },

  // ⭐ CATEGORY ADDED
  category: {
    type: String,
    required: true,
    enum: [
      "car",
      "bike",
      "scooter",
      "electric-car",
      "electric-bike",
      "electric-scooter",
    ],
  },

  specs: specSchema,
  keySpecifications: [String],
  topFeatures: [String],
  standOutFeatures: [String],
});

export default mongoose.model("Product", productSchema);
