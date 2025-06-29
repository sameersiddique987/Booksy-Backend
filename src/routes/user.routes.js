import express from "express";
import {
  loginUser,
  logoutUser,
  refreshToken,
  registerUser,
} from "../controllers/user.controllers.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import checkout from "../controllers/checkOut.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/logout", verifyToken, logoutUser);
router.post("/refreshtoken", refreshToken);
router.post('/checkout', checkout);


export default router;
