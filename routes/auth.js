import express from "express";
import {signup,signin,googlelogin} from "../controllers/auth.js"
const router = express.Router();

router.post('/signup',signup)
router.post('/signin',signin)
router.post('/googlelogin',googlelogin)

export default router