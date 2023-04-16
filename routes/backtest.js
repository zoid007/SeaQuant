import express from "express"
import { createBackTest, getAllBacktest } from "../controllers/backtest.js";
import {backTestResult} from "../controllers/backtestresult.js"
const router = express.Router();

router.get('/createbacktest',createBackTest)
router.post('/runbacktest',backTestResult)
router.get('/getAllBacktest',getAllBacktest)
export default router;