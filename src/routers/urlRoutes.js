import { Router } from "express";

import {
  getUrlById,
  redirectUrl,
  ranking,
} from "../controllers/urlController.js";

const router = Router();

router.get("/urls/:id", getUrlById);
router.get("/urls/open/:shortUrl", redirectUrl);
router.get("/ranking", ranking);

export default router;
