import { Router } from 'express';
import { createUrl, deleteUrl, openUrl, showUrl } from '../controllers/urls.controller.js';
import processRequestParams from '../middlewares/processRequestParams.js';

const router = new Router();

router.get('/:id', showUrl);
router.get('/open/:shortUrl', openUrl);
router.post('/shorten', createUrl);
router.delete('/:id', deleteUrl);

export { router as urlsRouter };
