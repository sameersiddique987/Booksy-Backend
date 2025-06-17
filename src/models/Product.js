import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);
export default Product; // ✅ use default export
