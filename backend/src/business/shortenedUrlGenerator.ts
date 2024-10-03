import { RandomStringGenerator } from "./randomStringGenerator";
import { ShortUrlRepository } from "./shortUrlRepository";

export class ShortenedUrlGenerator {
  randomStringGenerator: RandomStringGenerator;
  constructor(randomStringGenerator: RandomStringGenerator) {
    this.randomStringGenerator = randomStringGenerator;
  }

  public async generateShortenedUrl(
    shortUrlRepository: ShortUrlRepository
  ): Promise<string> {
    let shortenedUrl = this.randomStringGenerator.generateRandomString();
    while (await shortUrlRepository.findShortUrlByShortenedUrl(shortenedUrl)) {
      shortenedUrl = this.randomStringGenerator.generateRandomString();
    }
    return shortenedUrl;
  }
}
