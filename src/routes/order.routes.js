import express from "express";
import { getAllOrders, getUserOrders, createOrder, updateOrderStatus } from "../controllers/order.controller.js";
import {verifyToken} from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/all", verifyToken, getAllOrders);
router.get("/my",verifyToken, getUserOrders); 
router.post("/", verifyToken, createOrder);
router.put("/status", verifyToken, updateOrderStatus);

export default router;