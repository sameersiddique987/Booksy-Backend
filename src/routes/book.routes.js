import express from "express";
import { createBook, deleteBook, getBooks, updateBook } from "../controllers/book.controller.js";

import upload from "../middleware/multer.middleware.js"

const router = express.Router();


router.get("/", getBooks);
router.post("/", upload.single("image"), createBook);
router.put("/:id", upload.single("image"), updateBook);
router.delete("/:id", deleteBook);

export default router;
