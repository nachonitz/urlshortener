import express from "express";
import request from "supertest";
import { ShortUrlController } from "../../src/infrastructure/controllers/shortUrlController";
import { ShortUrlService } from "../../src/business/services/shortUrlService";
import { RandomStringGenerator } from "../../src/business/randomStringGenerator";
import { ShortenedUrlGenerator } from "../../src/business/shortenedUrlGenerator";
import { CustomRandomStringGenerator } from "../../src/infrastructure/customRandomGenerator/customRandomStringGenerator";
import { ShortUrl } from "../../src/business/shortUrl";
import { MemoryShortUrlRepository } from "../repositories/memoryShortUrlRepository";

const app = express();
app.use(express.json());

describe("ShortUrlController Integration Tests", () => {
  let shortUrlService: ShortUrlService;
  let shortUrlRepository: MemoryShortUrlRepository;
  let randomStringGenerator: RandomStringGenerator;
  let shortenedUrlGenerator: ShortenedUrlGenerator;
  let shortUrlController: ShortUrlController;

  const longUrl = "http://www.google.com";
  const createdShortUrlDto = { longUrl };

  beforeEach(() => {
    shortUrlRepository = new MemoryShortUrlRepository();
    randomStringGenerator = new CustomRandomStringGenerator();
    shortenedUrlGenerator = new ShortenedUrlGenerator(randomStringGenerator);

    shortUrlService = new ShortUrlService(
      shortUrlRepository,
      shortenedUrlGenerator
    );
    shortUrlController = new ShortUrlController(shortUrlService);

    app.post("/shorturl", (req, res) =>
      shortUrlController.createShortUrl(req, res)
    );

    app.get("/shorturl/:shortenedUrl", (req, res) =>
      shortUrlController.getLongUrlByShortenedUrl(req, res)
    );
  });

  test("Should create short url and return shortenedUrl", async () => {
    const response = await request(app)
      .post("/shorturl")
      .send(createdShortUrlDto)
      .expect(201);

    expect(response.body.shortenedUrl).toBeDefined();

    const createdShortUrl = await shortUrlRepository.findShortUrlByLongUrl(
      longUrl
    );
    expect(createdShortUrl).toBeDefined();
    expect(createdShortUrl?.longUrl).toBe(longUrl);
  });

  test("Should return 400 if longurl is invalid", async () => {
    const response = await request(app)
      .post("/shorturl")
      .send({ longUrl: "" })
      .expect(400);
  });

  test("Should return long url by shortened url", async () => {
    const shortUrl: ShortUrl = new ShortUrl(longUrl, "123456");
    shortUrlRepository.addShortUrl(shortUrl);

    const response = await request(app)
      .get(`/shorturl/${shortUrl.shortenedUrl}`)
      .expect(200);

    expect(response.body.longUrl).toBe(longUrl);
  });

  test("Should return 400 if shortened url is not found", async () => {
    const response = await request(app)
      .get(`/shorturl/${"asd.com"}`)
      .expect(404);
  });
});
