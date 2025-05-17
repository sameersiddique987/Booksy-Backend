import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./src/db/index.js";
import routes from "./src/routes/user.routes.js";
import bookRoutes from "./src/routes/book.routes.js";
import adminLogin from "./src/routes/admin.login.routes.js";
import uploadRoutes from "./src/routes/upload.routes.js"; 

const app = express();
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:3000",
  "https://booksy-admin-panel.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));


app.get("/", (req, res) => {
  res.send("Server is running...");
});
app.use('/uploads', express.static('uploads'));
// ✅ Routes
app.use("/api/v1", routes);
app.use("/books", bookRoutes);
app.use("/api/v1", adminLogin);
app.use("/upload", uploadRoutes); 

// ✅ Start DB and server
connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`⚙️ Server running on port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("❌ MongoDB Connection Failed!", err);
  });













