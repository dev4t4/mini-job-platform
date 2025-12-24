import { authController } from "@/controllers/auth";
import { Router } from "express";

const router = Router();

router.post("/auth/login", authController.login);
router.post("/auth/signup", authController.signup);
router.post("/auth/verify", authController.verify);

export default router;
