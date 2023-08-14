import express = require("express");
import { getUser } from "../../controller/users";
import passport from "../../middleware/passport";


const router = express.Router();

router.get('/:id', passport.authenticate('jwt', { session: false }), getUser);
router.get('/', passport.authenticate('jwt', { session: false }), getUser);

export default router;