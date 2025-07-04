import dotenv from 'dotenv';
import Stripe from 'stripe';
import Order from '../models/order.model.js';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const checkout = async (req, res) => {
  try {
    const { products } = req.body;

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Invalid or missing products" });
    }

    const userId = req.user?._id;
    const userEmail = req.user?.email;

    const lineItems = products.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.title,
          metadata: {
            productId: item.id?.toString() || 'N/A',
          },
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    // Save order without size
    const newOrder = new Order({
      userId: userId || null,
      email: userEmail || null,
      products: products.map((p) => ({
        title: p.title,
        price: p.price,
        quantity: p.quantity,
      })),
      status: 'pending',
      totalAmount: products.reduce((acc, item) => acc + item.price * item.quantity, 0),
    });

    await newOrder.save();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `https://booksy-project.vercel.app/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `https://booksy-project.vercel.app/cancel`,
      metadata: {
        orderId: newOrder._id.toString(),
      },
    });

    res.status(200).json({ message: 'Session created', id: session.id });
  } catch (error) {
    console.error('Checkout Error:', error.message);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

export default checkout;
