import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  image: String,
  description: String,
  price: Number,
}, {
  timestamps: true,
});

const Book = mongoose.model("BookBooksy", bookSchema);
export default Book;
