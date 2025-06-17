// controllers/product.controller.js

import Product from '../models/Product.js';

import User from '../models/user.model.js';

// ✅ Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get single product by ID (for product detail page)
export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Toggle wishlist
export const toggleWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { productId } = req.body;

    const index = user.wishlist.indexOf(productId);
    if (index === -1) {
      user.wishlist.push(productId);
    } else {
      user.wishlist.splice(index, 1);
    }

    await user.save();
    res.json({ wishlist: user.wishlist });
  } catch (err) {
    res.status(500).json({ message: "Wishlist toggle failed" });
  }
};


export const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: 'wishlist',
      select: 'title price description', // optional
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 🟡 Ye line yahan lagao
    console.log("Fetched User Wishlist:", user?.wishlist);

    res.status(200).json({ products: user.wishlist });
  } catch (err) {
    console.error("❌ Wishlist Error:", err);
    res.status(500).json({ message: "Failed to get wishlist" });
  }
};


// ✅ Admin: Add product
export const addProduct = async (req, res) => {
  const { title, description, price } = req.body;

  if (!title || !description || !price) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const product = new Product({ title, description, price });
    await product.save();
    res.status(201).json({ message: "Product created", product });
  } catch (err) {
    res.status(500).json({ message: "Product creation failed" });
  }
};

// ✅ Admin: Update product
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { title, description, price } = req.body;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.title = title || product.title;
    product.description = description || product.description;
    product.price = price || product.price;

    await product.save();
    res.json({ message: "Product updated", product });
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

// ✅ Admin: Delete product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};





