import { Router } from "express";

import authentication from '../middlewares/authMiddleware.js';
import { postUrl, deleteUrl, getMyUrls } from "../controllers/authUrlControllers.js";
import { deleteUrlMiddleware, urlValidate } from "../middlewares/urlsMiddlewares.js";

const router = Router();

router.use(authentication);
router.get('/users/me', getMyUrls);
router.post('/urls/shorten', urlValidate, postUrl);
router.delete('/urls/:id', deleteUrlMiddleware, deleteUrl);

export default router;