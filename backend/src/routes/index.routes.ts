import express = require("express");

const indexRouter = express.Router();

import APIROUTER from './api/index.routes';

// ========================================== [API] ==================================== //

indexRouter.use("/api/v1", APIROUTER);


export default indexRouter;
