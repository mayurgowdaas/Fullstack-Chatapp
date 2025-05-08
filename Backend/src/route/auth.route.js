import express from "express";
import {
  logIn,
  signIn,
  logOut,
  updateProfile,
  checkAuth,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/login", logIn);
router.post("/signin", signIn);
router.post("/logout", logOut);
router.put("/profile", protectRoute, updateProfile);
router.get("/check", protectRoute, checkAuth);

export default router;
