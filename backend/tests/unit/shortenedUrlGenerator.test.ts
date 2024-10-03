import { RandomStringGenerator } from "../../src/business/randomStringGenerator";
import { ShortUrlService } from "../../src/business/services/shortUrlService";
import { ShortenedUrlGenerator } from "../../src/business/shortenedUrlGenerator";
import { ShortUrl } from "../../src/business/shortUrl";
import { MemoryShortUrlRepository } from "../repositories/memoryShortUrlRepository";

describe("ShortenedUrlGenerator", () => {
  let mockRandomStringGenerator: jest.Mocked<RandomStringGenerator>;
  let shortenedUrlGenerator: ShortenedUrlGenerator;
  let shortUrlRepository: MemoryShortUrlRepository;

  const longUrl = "http://www.google.com";

  beforeEach(() => {
    shortUrlRepository = new MemoryShortUrlRepository();

    mockRandomStringGenerator = {
      generateRandomString: jest.fn(),
    };

    shortenedUrlGenerator = new ShortenedUrlGenerator(
      mockRandomStringGenerator
    );
  });

  test("Should return shortened url", async () => {
    mockRandomStringGenerator.generateRandomString.mockReturnValueOnce(
      "123456"
    );
    const shortenedUrl = await shortenedUrlGenerator.generateShortenedUrl(
      shortUrlRepository
    );

    expect(mockRandomStringGenerator.generateRandomString).toHaveBeenCalled();
    expect(shortenedUrl).toBe("123456");
  });

  test("Should return a different shortened url if the first one already exists", async () => {
    mockRandomStringGenerator.generateRandomString
      .mockReturnValueOnce("123456")
      .mockReturnValueOnce("123456")
      .mockReturnValueOnce("654321");

    const shortUrl: ShortUrl = new ShortUrl(longUrl, "123456");

    shortUrlRepository.addShortUrl(shortUrl);

    const shortenedUrl = await shortenedUrlGenerator.generateShortenedUrl(
      shortUrlRepository
    );

    expect(
      mockRandomStringGenerator.generateRandomString
    ).toHaveBeenCalledTimes(3);
    expect(shortenedUrl).toBe("654321");
  });
});
