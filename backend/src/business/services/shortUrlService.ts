import { ShortUrlRepository } from "../shortUrlRepository";
import { ShortUrl } from "../shortUrl";
import { ShortenedUrlGenerator } from "../shortenedUrlGenerator";

export class ShortUrlService {
  private shortUrlRepository: ShortUrlRepository;
  private shortenedUrlGenerator: ShortenedUrlGenerator;

  constructor(
    shortUrlRepository: ShortUrlRepository,
    shortenedUrlGenerator: ShortenedUrlGenerator
  ) {
    this.shortUrlRepository = shortUrlRepository;
    this.shortenedUrlGenerator = shortenedUrlGenerator;
  }

  public async createShortUrl(longUrl: string): Promise<string | null> {
    try {
      if (!longUrl) {
        throw new Error("Long URL is required");
      }
      const shortenedUrl =
        await this.shortenedUrlGenerator.generateShortenedUrl(
          this.shortUrlRepository
        );

      const shortUrl = new ShortUrl(longUrl, shortenedUrl);
      await this.shortUrlRepository.addShortUrl(shortUrl);

      return shortenedUrl;
    } catch (error) {
      throw error;
    }
  }

  public async getLongUrlByShortenedUrl(
    shortenedUrl: string
  ): Promise<string | null> {
    try {
      if (!shortenedUrl) {
        throw new Error("Shortened URL is required");
      }
      const shortUrl = await this.shortUrlRepository.findShortUrlByShortenedUrl(
        shortenedUrl
      );
      if (!shortUrl) {
        throw new Error("Short URL not found");
      }
      shortUrl.increaseVisitorsCount();
      await this.shortUrlRepository.updateShortUrl(shortUrl);
      return shortUrl.longUrl;
    } catch (error) {
      throw error;
    }
  }
}
