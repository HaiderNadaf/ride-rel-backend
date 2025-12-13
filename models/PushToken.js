import mongoose from "mongoose";

const schema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
});

export default mongoose.model("PushToken", schema);
