import { Router } from "express";
import { addNewApplicant } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router() ;

// make new applicant route

router.post("/add-user", upload.single("resume"), addNewApplicant) ;

export default router ;