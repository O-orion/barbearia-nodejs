import { Router } from "express";
import AuthController from "../controllers/AuthController";

const router = Router();
const authController = new AuthController();

router.post("/login", authController.login.bind(authController));
router.get("/google", authController.googleLogin.bind(authController));
router.get("/google/callback", authController.googleLoginCallback.bind(authController));
router.get("/success", authController.success.bind(authController));

export default router;
