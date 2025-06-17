import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./src/db/index.js";
<<<<<<< HEAD
import routes from "./src/routes/user.routes.js";
import bookRoutes from "./src/routes/book.routes.js";
import adminLogin from "./src/routes/admin.login.routes.js";
import uploadRoutes from "./src/routes/upload.routes.js";
import Auth from "./src/routes/user.routes"
=======
import authRoutes from './src/routes/user.routes.js';
import productRoutes from './src/routes/product.Routes.js';
import reviewRoutes from './src/routes/review.Routes.js';
>>>>>>> 064c02ca330e206318f8dc0f481f62f815b1257b

const app = express();
// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS configuration
const allowedOrigins = [
 "http://localhost:5173"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Test route
app.get("/", (req, res) => {
  res.send("✅ Server is running...");
}); 

// API Routes
<<<<<<< HEAD
app.use("/api/v1", routes);
app.use("/books", bookRoutes);
app.use("/api/v1", adminLogin);
app.use("/upload", uploadRoutes);
app.use("/Auth", Auth );
=======
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewRoutes);
>>>>>>> 064c02ca330e206318f8dc0f481f62f815b1257b
// Connect to DB and start server
connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`⚙️ Server running on port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("❌ MongoDB Connection Failed!", err);
  });
