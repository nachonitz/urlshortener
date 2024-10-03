import { ShortUrl } from "./shortUrl";

export interface ShortUrlRepository {
  addShortUrl(shortUrl: ShortUrl): Promise<void>;
  deleteShortUrl(shortenedUrl: string): Promise<void>;
  findShortUrlByLongUrl(longUrl: string): Promise<ShortUrl | undefined>;
  findShortUrlByShortenedUrl(
    shortenedUrl: string
  ): Promise<ShortUrl | undefined>;
  updateShortUrl(shortUrl: ShortUrl): Promise<void>;
}
