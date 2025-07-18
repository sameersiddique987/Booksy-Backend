import dotenv from "dotenv";
import Stripe from "stripe";
import Order from "../models/order.model.js";

dotenv.config();

if (!process.env.STRIPE_SECRET_KEY) {
  console.error(" STRIPE_SECRET_KEY missing in .env");
  process.exit(1);
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const checkout = async (req, res) => {
  try {
    const { products } = req.body;

    console.log("📦 Received Products:", products);

    if (!Array.isArray(products) || products.length === 0) {
      return res
        .status(400)
        .json({ error: "Products array is missing or invalid" });
    }

    const lineItems = products.map((item) => {
      if (
        !item.title ||
        typeof item.price !== "number" ||
        typeof item.quantity !== "number"
      ) {
        throw new Error(` Invalid product: ${JSON.stringify(item)}`);
      }

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title,
            metadata: {
              productId: item.id || "unknown",
            },
          },
          unit_amount: Math.max(50, Math.round(item.price * 100)),
        },
        quantity: item.quantity,
      };
    });

    console.log(" Stripe Line Items:", lineItems);

    const newOrder = new Order({
      userId: req.user?._id || null,
      email: req.user?.email || null,
      products: products.map((p) => ({
        title: p.title,
        price: p.price,
        quantity: p.quantity,
      })),
      status: "pending",
      totalAmount: products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      ),
    });

    await newOrder.save();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url:
        "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:3000/cancel",
      metadata: {
        orderId: newOrder._id.toString(),
      },
    });

    console.log(" Stripe session created:", session.id);
    res.status(200).json({ message: "Session created", id: session.id });
  } catch (error) {
    console.error(" Checkout Error:", error.message);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

export default checkout;
