import { Router } from 'express';
import { rankUsers, showCurrentUser, signup } from '../controllers/users.controller.js';
import authenticate from '../middlewares/authenticate.js';
import processRequestParams from '../middlewares/processRequestParams.js';
import { signupSchema } from '../schemas/user.requests.js';

const router = new Router();

router.get('/ranking', processRequestParams, rankUsers);
router.get('/users/me', authenticate, showCurrentUser);
router.post('/signup', processRequestParams(signupSchema), signup);

export { router as usersRouter };
