import { Router } from "express";

import authentication from '../middlewares/authMiddleware.js';
import { postUrl, deleteUrl, getMyUrls } from "../controllers/authUrlControllers.js";
import { deleteUrlValidate, urlValidate } from "../middlewares/urlsMiddlewares.js";

const router = Router();

router.use(authentication);

router.post('/urls/shorten', urlValidate, postUrl);
router.delete('/urls/:id', deleteUrlValidate, deleteUrl);
router.get('/users/me', getMyUrls);

export default router;