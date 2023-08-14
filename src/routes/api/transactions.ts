import express = require("express");
import { buy, sell, transfer } from "../../controller/transactions";
import passport from "../../middleware/passport";


const router = express.Router();

router.post('/buy', passport.authenticate('jwt', { session: false }), buy);
router.post('/sell', passport.authenticate('jwt', { session: false }), sell);
router.post('/transfer', passport.authenticate('jwt', { session: false }), transfer);

export default router;