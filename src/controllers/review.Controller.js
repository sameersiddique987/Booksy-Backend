import { Review } from '../models/Review.js';

export const createReview = async (req, res) => {
  const { productId, rating, comment } = req.body;
  const existing = await Review.findOne({ user: req.user._id, product: productId });

  if (existing) return res.status(400).json({ message: 'Review already exists' });

  const review = await Review.create({
    user: req.user._id,
    product: productId,
    rating,
    comment,
  });

  res.json(review);
};

export const updateReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review || review.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  const { rating, comment } = req.body;
  review.rating = rating;
  review.comment = comment;
  await review.save();
  res.json(review);
};

export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await review.deleteOne(); // ✅ Correct method
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


export const getProductReviews = async (req, res) => {
  const reviews = await Review.find({ product: req.params.productId });
  const avg =
    reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1);

  res.json({ reviews, averageRating: avg.toFixed(1) });
};

export const adminDeleteReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) return res.status(404).json({ message: 'Not found' });
  await review.remove();
  res.json({ message: 'Review removed by admin' });
};
