import express from "express";
import {createNewStrategy,getAllStrategy, saveDragDropLogicById, getStrategy} from "../controllers/strategy.js"
import auth from "../middleware/auth.js"
const router = express.Router();

router.post('/savedragdropstrategyname',createNewStrategy)
router.post('/savedragdropstrategybyid',saveDragDropLogicById)
router.get('/getallstrategy',getAllStrategy)
router.get('/getstrategy',getStrategy)

export default router