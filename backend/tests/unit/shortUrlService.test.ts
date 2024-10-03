import { RandomStringGenerator } from "../../src/business/randomStringGenerator";
import { ShortUrlService } from "../../src/business/services/shortUrlService";
import { ShortenedUrlGenerator } from "../../src/business/shortenedUrlGenerator";
import { ShortUrl } from "../../src/business/shortUrl";
import { MemoryShortUrlRepository } from "../repositories/memoryShortUrlRepository";

describe("ShortUrlService", () => {
  let mockRandomStringGenerator: jest.Mocked<RandomStringGenerator>;
  let mockShortenedUrlGenerator: jest.Mocked<ShortenedUrlGenerator>;
  let shortUrlRepository: MemoryShortUrlRepository;
  let shortUrlService: ShortUrlService;

  const longUrl: string = "http://www.google.com";

  beforeEach(() => {
    shortUrlRepository = new MemoryShortUrlRepository();

    mockRandomStringGenerator = {
      generateRandomString: jest.fn(),
    };

    mockShortenedUrlGenerator = {
      generateShortenedUrl: jest.fn(),
      randomStringGenerator: mockRandomStringGenerator,
    };

    shortUrlService = new ShortUrlService(
      shortUrlRepository,
      mockShortenedUrlGenerator
    );

    mockShortenedUrlGenerator.generateShortenedUrl.mockReturnValueOnce(
      Promise.resolve("123456")
    );
  });

  test("createShortUrl Should return shortened url provided by shortened url generator", async () => {
    const shortenedUrl = await shortUrlService.createShortUrl(longUrl);

    expect(mockShortenedUrlGenerator.generateShortenedUrl).toHaveBeenCalled();
    expect(shortenedUrl).toBe("123456");
  });

  test("createShortUrl Should store shortUrl in repository", async () => {
    await shortUrlService.createShortUrl(longUrl);

    let createdShortUrl = await shortUrlRepository.findShortUrlByLongUrl(
      longUrl
    );

    expect(createdShortUrl).toBeDefined();
    expect(createdShortUrl?.longUrl).toBe(longUrl);
  });

  test("createShortUrl Should raise error if long url is not provided", async () => {
    await expect(shortUrlService.createShortUrl("")).rejects.toThrowError();
  });

  test("getLongUrlByShortenedUrl Should return short url by shortened url", async () => {
    const shortUrl: ShortUrl = new ShortUrl(longUrl, "123456");
    shortUrlRepository.addShortUrl(shortUrl);

    const retrievedLongUrl = await shortUrlService.getLongUrlByShortenedUrl(
      "123456"
    );

    expect(retrievedLongUrl).toBeDefined();
    expect(retrievedLongUrl).toBe(longUrl);
  });

  test("getLongUrlByShortenedUrl Should raise error if shortened url is not provided", async () => {
    await expect(
      shortUrlService.getLongUrlByShortenedUrl("")
    ).rejects.toThrowError();
  });

  test("getLongUrlByShortenedUrl Should raise error if short url is not found", async () => {
    await expect(
      shortUrlService.getLongUrlByShortenedUrl("123456")
    ).rejects.toThrowError();
  });

  test("getLongUrlByShortenedUrl Should increase visitors count", async () => {
    const shortUrl: ShortUrl = new ShortUrl(longUrl, "123456");
    shortUrlRepository.addShortUrl(shortUrl);

    await shortUrlService.getLongUrlByShortenedUrl("123456");
    await shortUrlService.getLongUrlByShortenedUrl("123456");

    const retrievedShortUrl =
      await shortUrlRepository.findShortUrlByShortenedUrl("123456");

    const visitorsCount = retrievedShortUrl?.getVisitorsCount();
    expect(visitorsCount).toBe(2);
  });
});
