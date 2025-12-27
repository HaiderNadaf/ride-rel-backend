// import mongoose from "mongoose";

// const specSchema = new mongoose.Schema({
//   engine: String,
//   power: String,
//   torque: String,
//   transmission: String,
//   driveType: String,
//   groundClearance: String,
// });

// // Main product schema
// const productSchema = new mongoose.Schema({
//   image: { type: String, required: true },
//   text: { type: String, required: true },
//   price: { type: Number, required: true },

//   // ⭐ CATEGORY ADDED
//   category: {
//     type: String,
//     required: true,
//     enum: [
//       "car",
//       "bike",
//       "scooter",
//       "electric-car",
//       "electric-bike",
//       "electric-scooter",
//     ],
//   },

//   specs: specSchema,
//   keySpecifications: [String],
//   topFeatures: [String],
//   standOutFeatures: [String],
// });

// export default mongoose.model("Product", productSchema);
import mongoose from "mongoose";

const specSchema = new mongoose.Schema({
  engine: String,
  power: String,
  torque: String,
  transmission: String,
  driveType: String,
  groundClearance: String,
});

const productSchema = new mongoose.Schema({
  image: { type: String, required: true },
  text: { type: String, required: true }, // ✅ REQUIRED
  price: { type: Number, required: true },
  brand: { type: String, required: true }, // ⭐ BRAND ADDED
  model: { type: String, required: true }, // ⭐ MODEL ADDED

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
