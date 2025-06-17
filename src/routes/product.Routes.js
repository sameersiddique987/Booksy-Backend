import express from 'express';
import {
  getAllProducts,
  toggleWishlist,
  addProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  getWishlist,
} from '../controllers/product.Controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

// ⭐ Public
router.get('/', getAllProducts);
router.get('/:id', getSingleProduct);

// ❤️ User Wishlist
router.post('/wishlist', verifyToken, toggleWishlist);
router.get('/wishlist', verifyToken, getWishlist);

// 🛠 Admin CRUD (protected)
router.post('/', verifyToken, addProduct);
router.put('/:id', verifyToken, updateProduct);
router.delete('/:id', verifyToken, deleteProduct);

export default router;
