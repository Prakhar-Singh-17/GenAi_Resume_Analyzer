import express from "express";
import { register ,login ,profile,logout} from "../controllers/userController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register",register)
router.post("/login",login)
router.get("/profile",verifyToken,profile)
router.get("/logout",logout)


export {router as userRoutes}