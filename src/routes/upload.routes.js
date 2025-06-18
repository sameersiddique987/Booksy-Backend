import express from "express";
import multer from "multer";
import uploadImageToCloudinary from "../utils/uploadToCloudinary.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const fileBuffer = req.file.buffer;

    const url = await uploadImageToCloudinary(fileBuffer);

    return res.status(200).json({ url });
  } catch (error) {
    console.error("Image Upload Error:", error);
    return res.status(500).json({ error: "Image upload failed" });
  }
});

export default router;
