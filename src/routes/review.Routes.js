// routes/review.Routes.js

import express from 'express';
import {
  createReview,
  updateReview,
  deleteReview,
  getProductReviews,
  adminDeleteReview,
} from '../controllers/review.Controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { isAdmin } from '../middleware/isAdmin.js';

const router = express.Router();

// ✅ Get all reviews for a product
router.get('/product/:productId', getProductReviews);

// ✅ Create review for a product
router.post('/', verifyToken, createReview);

// ✅ Update a review by the same user
router.put('/:id', verifyToken, updateReview);

// ✅ Delete a review by the same user
router.delete('/:id', verifyToken, deleteReview);

// ✅ Admin deletes any review
router.delete('/admin/:id', verifyToken, isAdmin, adminDeleteReview);

export default router;

