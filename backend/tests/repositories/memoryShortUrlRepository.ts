import { ShortUrl } from "../../src/business/shortUrl";
import { ShortUrlRepository } from "../../src/business/shortUrlRepository";

export class MemoryShortUrlRepository implements ShortUrlRepository {
  private shortUrls: { [shortenedUrl: string]: ShortUrl } = {};

  async addShortUrl(shortUrl: ShortUrl): Promise<void> {
    if (!shortUrl.shortenedUrl) {
      throw new Error("ShortUrl must have a shortenedUrl");
    }
    if (this.shortUrls[shortUrl.shortenedUrl]) {
      throw new Error("ShortUrl already exists");
    }

    this.shortUrls[shortUrl.shortenedUrl] = shortUrl;
  }

  async deleteShortUrl(shortenedUrl: string): Promise<void> {
    delete this.shortUrls[shortenedUrl];
  }

  async findShortUrlByLongUrl(longUrl: string): Promise<ShortUrl | undefined> {
    return Object.values(this.shortUrls).find(
      (shortUrl) => shortUrl.longUrl === longUrl
    );
  }

  async findShortUrlByShortenedUrl(
    shortenedUrl: string
  ): Promise<ShortUrl | undefined> {
    return this.shortUrls[shortenedUrl];
  }

  async updateShortUrl(shortUrl: ShortUrl): Promise<void> {
    this.shortUrls[shortUrl.shortenedUrl] = shortUrl;
  }
}
