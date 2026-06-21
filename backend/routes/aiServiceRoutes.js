import express from "express";
import { aiReportGeneration, fetchAllReports, fetchreport } from "../controllers/aiServiceController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/fileMiddleware.js";

const router = express.Router();


router.post("/aiReport",verifyToken,upload.single("resume"),aiReportGeneration);
router.get("/allReports",verifyToken,fetchAllReports);
router.get("/fetchReport/:id",verifyToken,fetchreport)

export {router as aiServiceRouter}