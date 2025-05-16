import Book from "../models/book.model.js";
import uploadImageToCloudinary from "../utils/uploadToCloudinary.js";

// Get all books
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch books" });
  }
};

// Create new book with image upload
export const createBook = async (req, res) => {
  try {
    const { title, author, price, description } = req.body;

    let imageUrl = "";
    if (req.file) {
      imageUrl = await uploadImageToCloudinary(req.file.path);
      if (!imageUrl) return res.status(500).json({ message: "Image upload failed" });
    }

    const newBook = new Book({
      title,
      author,
      price,
      description,
      image: imageUrl,
    });

    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ message: "Failed to create book" });
  }
};

// Update a book with optional new image
export const updateBook = async (req, res) => {
  try {
    const { title, author, price, description } = req.body;
    let updateData = { title, author, price, description };

    if (req.file) {
      const imageUrl = await uploadImageToCloudinary(req.file.path);
      if (!imageUrl) return res.status(500).json({ message: "Image upload failed" });
      updateData.image = imageUrl;
    }

    const updated = await Book.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update book" });
  }
};

// Delete a book
export const deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete book" });
  }
};
