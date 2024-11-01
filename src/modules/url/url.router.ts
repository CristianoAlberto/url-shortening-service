import { Router } from "express";
import { UrlController } from "./url.controller";
import { UrlRepository } from "./url.repository";
const router = Router();
const controller = new UrlController(new UrlRepository());
router.post('/createUrl', controller.create);
router.put('/updateUrl/:shortUrl', controller.updateUrl);
router.delete('/deleteUrl/:shortUrl', controller.delete);
router.get('/findShortUrl/:shortUrl', controller.findByShortUrl)
router.get('/shorten/:shortUrl/stats', controller.showStats)
export { router }