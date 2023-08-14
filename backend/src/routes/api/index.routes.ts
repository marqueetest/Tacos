import express = require("express");

const apiRouter = express.Router();

import AUTH from './auth';
import USERS from './users';
import TRANSACTIONS from './transactions';

apiRouter.use("/auth", AUTH);
apiRouter.use("/users", USERS);
apiRouter.use("/transactions", TRANSACTIONS);

export default apiRouter;