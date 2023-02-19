import { Router } from 'express';
import { createUrl, deleteUrl, openUrl, showUrl } from '../controllers/urls.controller.js';
import authenticate from '../middlewares/authenticate.js';
import processRequestParams from '../middlewares/processRequestParams.js';
import idOnlySchema from '../schemas/idOnly.requests.js';
import { createUrlSchema, openUrlSchema } from '../schemas/url.requests.js';

const router = new Router();

router.get('/:id', processRequestParams(idOnlySchema), showUrl);
router.get('/open/:shortUrl', processRequestParams(openUrlSchema), openUrl);
router.post('/shorten', processRequestParams(createUrlSchema), authenticate, createUrl);
router.delete('/:id', processRequestParams(idOnlySchema), deleteUrl);

export { router as urlsRouter };
