import { Router } from "express";
import { ShortUrlController } from "../controllers/shortUrlController";
import dotenv from "dotenv";
import { CustomRandomStringGenerator } from "../customRandomGenerator/customRandomStringGenerator";
import { ShortenedUrlGenerator } from "../../business/shortenedUrlGenerator";
import { ShortUrlService } from "../../business/services/shortUrlService";
import { TypeOrmMemoryShortUrlRepository } from "../typeorm/repositories/shortUrlRepository";

dotenv.config();

const router = Router();

const shortUrlRepository = new TypeOrmMemoryShortUrlRepository();
const randomStringGenerator = new CustomRandomStringGenerator();
const shortenedUrlGenerator = new ShortenedUrlGenerator(randomStringGenerator);

const shortUrlService = new ShortUrlService(
  shortUrlRepository,
  shortenedUrlGenerator
);
const shortUrlController = new ShortUrlController(shortUrlService);

router.post("/", shortUrlController.createShortUrl);
router.get("/:shortenedUrl", shortUrlController.getLongUrlByShortenedUrl);

export default router;
