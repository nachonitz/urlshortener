import { api } from "../api";
import { CreateShortUrlDto } from "../models/shortUrl";

export const createShortUrl = async (
  shortUrl: CreateShortUrlDto
): Promise<string> => {
  const response = await api.post("/shorturl", shortUrl);
  const shortenedUrl: string = response.data.shortenedUrl;
  return shortenedUrl;
};

export const getLongUrlByShortenedUrl = async (
  shortenedUrl: string
): Promise<string> => {
  const response = await api.get(`/shorturl/${shortenedUrl}`);
  const longUrl: string = response.data.longUrl;
  return longUrl;
};
