import express = require("express");
import { Request, Response } from 'express';

const apiRouter = express.Router();

import AUTH from './auth';
import USERS from './users';
import TRANSACTIONS from './transactions';

apiRouter.use("/auth", AUTH);
apiRouter.use("/users", USERS);
apiRouter.use("/transactions", TRANSACTIONS);

/*
 * For server health check
 */
apiRouter.get('/healthCheck', (req: Request, res: Response) => {
    return res.status(200).json({ msg: 'OK' });
});

export default apiRouter;