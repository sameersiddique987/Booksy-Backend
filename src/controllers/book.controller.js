// import Book from "../models/book.model.js";
// import uploadImageToCloudinary from "../utils/uploadToCloudinary.js";

// // Get all books
// export const getBooks = async (req, res) => {
//   try {
//     const books = await Book.find();
//     res.json(books);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch books" });
//   }
// };

// export const createBook = async (req, res) => {
//   try {
//     const { title, author, price, description, image } = req.body;

//     let imageUrl = image || "";

//     const newBook = new Book({
//       title,
//       author,
//       price,
//       description,
//       image: imageUrl,
//     });

//     await newBook.save();
//     res.status(201).json(newBook);
//   } catch (err) {
//     console.error("❌ Failed to create book:", err);
//     res.status(500).json({ message: "Failed to create book" });
//   }
// };

// export const updateBook = async (req, res) => {
//   try {
//     const { title, author, price, description, image } = req.body;

//     let updateData = { title, author, price, description };

//     if (image) {
//       updateData.image = image;
//     }

//     if (req.file) {
//       const imageUrl = await uploadImageToCloudinary(req.file.path);
//       if (!imageUrl) {
//         return res.status(500).json({ message: "Image upload failed" });
//       }
//       updateData.image = imageUrl;
//     }

//     const updated = await Book.findByIdAndUpdate(req.params.id, updateData, {
//       new: true,
//     });

//     if (!updated) {
//       return res.status(404).json({ message: "Book not found" });
//     }

//     res.json(updated);
//   } catch (err) {
//     console.error("❌ Update Error:", err);
//     res.status(500).json({ message: "Failed to update book" });
//   }
// };

// // Delete a book
// export const deleteBook = async (req, res) => {
//   try {
//     await Book.findByIdAndDelete(req.params.id);
//     res.json({ message: "Book deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Failed to delete book" });
//   }
// };




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

// Create new book
export const createBook = async (req, res) => {
  try {
    const { title, author, price, description } = req.body;
    let imageUrl = "";

    // If file is uploaded
    if (req.file) {
      imageUrl = await uploadImageToCloudinary(req.file.path);
      if (!imageUrl) {
        return res.status(500).json({ message: "Image upload failed" });
      }
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
    console.error("❌ Failed to create book:", err);
    res.status(500).json({ message: "Failed to create book" });
  }
};

// Update existing book
export const updateBook = async (req, res) => {
  try {
    const { title, author, price, description, image } = req.body;
    let updateData = { title, author, price, description };

    // If new file is uploaded
    if (req.file) {
      const imageUrl = await uploadImageToCloudinary(req.file.path);
      if (!imageUrl) {
        return res.status(500).json({ message: "Image upload failed" });
      }
      updateData.image = imageUrl;
    } else if (image) {
      updateData.image = image;
    }

    const updated = await Book.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("❌ Update Error:", err);
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
