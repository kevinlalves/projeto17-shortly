import { Router } from 'express';
import { signin } from '../controllers/auth.controller.js';
import processRequestParams from '../middlewares/processRequestParams.js';

const router = new Router();

router.post('/signin', processRequestParams, signin);

export { router as authRouter };
