import { Router } from 'express';
import { signin } from '../controllers/auth.controller.js';
import processRequestParams from '../middlewares/processRequestParams.js';
import { signinSchema } from '../schemas/auth.requests.js';

// eslint-disable-next-line new-cap
const router = Router();

router.post('/signin', processRequestParams(signinSchema), signin);

export { router as authRouter };
