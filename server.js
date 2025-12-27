// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import cors from "cors";
// import productRoutes from "./routes/productRoutes.js";

// dotenv.config();
// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api/products", productRoutes);
// app.use("/api", productRoutes);

// // connect mongodb
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.log("DB Error", err));

// // routes
// app.use("/api/products", productRoutes);

// app.listen(process.env.PORT, () =>
//   console.log(`Server running on port ${process.env.PORT}`)
// );

// import dotenv from "dotenv";
// dotenv.config();
// import express from "express";

// import mongoose from "mongoose";
// import cors from "cors";

// import productRoutes from "./routes/productRoutes.js";
// import pushRoutes from "./routes/push.js";

// const app = express();

// app.use(cors());
// app.use(express.json());

// // HOME ROUTE
// app.get("/", (req, res) => {
//   res.send(
//     "🚗 Welcome to Ride_Resell — Your all-in-one marketplace for buying and selling cars, bikes, electric vehicles, and scooters."
//   );
// });

// // ROUTES
// app.use("/api/products", productRoutes);
// app.use("/api", pushRoutes);

// // CONNECT DB
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => consoleconsole.error("❌ DB Error:", err));

// // START SERVER (IMPORTANT: 0.0.0.0)
// app.listen(process.env.PORT || 5000, "0.0.0.0", () => {
//   console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
// });

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import productRoutes from "./routes/productRoutes.js";
import pushRoutes from "./routes/push.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚗 Ride_Resell backend running");
});

app.use("/api/products", productRoutes);
app.use("/api", pushRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ DB Error:", err));

app.listen(process.env.PORT || 5000, () => {
  console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
});
