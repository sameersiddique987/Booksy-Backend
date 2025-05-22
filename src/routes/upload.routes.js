// import express from "express";
// import multer from "multer";
// import uploadImageToCloudinary from "../utils/uploadToCloudinary.js";

// const router = express.Router();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./uploads");
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + "-" + uniqueSuffix);
//   },
// });

// const upload = multer({ storage });

// router.post("/", upload.single("image"), async (req, res) => {
//   try {
//     const localPath = req.file.path;

//     const url = await uploadImageToCloudinary(localPath);

//     return res.status(200).json({ url });
//   } catch (error) {
//     console.error("Image Upload Error:", error);
//     return res.status(500).json({ error: "Image upload failed" });
//   }
// });

// export default router;


import express from "express";
import multer from "multer";
import uploadImageToCloudinary from "../utils/uploadToCloudinary.js";

const router = express.Router();

// Use memory storage to store files in buffer
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const fileBuffer = req.file.buffer;

    // Upload image to Cloudinary from buffer
    const url = await uploadImageToCloudinary(fileBuffer);

    return res.status(200).json({ url });
  } catch (error) {
    console.error("Image Upload Error:", error);
    return res.status(500).json({ error: "Image upload failed" });
  }
});

export default router;
