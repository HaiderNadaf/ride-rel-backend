import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "ride-resell",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

export const upload = multer({ storage });
