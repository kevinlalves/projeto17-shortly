import { Router } from 'express';
import { rankUsers, showCurrentUser, signup } from '../controllers/users.controller.js';
import processRequestParams from '../middlewares/processRequestParams.js';

const router = new Router();

router.get('/ranking', processRequestParams, rankUsers);
router.get('/users/me', processRequestParams, showCurrentUser);
router.post('/signup', processRequestParams, signup);

export { router as usersRouter };
