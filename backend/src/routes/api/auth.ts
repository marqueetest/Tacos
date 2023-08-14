import express = require("express");
import { createUser, login, logout } from "../../controller/users";
import passport from "../../middleware/passport";

const router = express.Router();

router.post('/signup', createUser);
router.post('/login', login);
router.post('/logout', passport.authenticate('jwt', { session: false }), logout);

export default router;