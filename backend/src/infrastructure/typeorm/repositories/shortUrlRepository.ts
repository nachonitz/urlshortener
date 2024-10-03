import { Repository, getRepository } from "typeorm";
import { ShortUrlRepository } from "../../../business/shortUrlRepository";
import { ShortUrlEntity } from "../entities/shortUrl.entity";
import { ShortUrl } from "../../../business/shortUrl";
import { ShortUrlMapper } from "../../mappers/shortUrlMapper";
import AppDataSource from "../typeorm.config";

export class TypeOrmMemoryShortUrlRepository implements ShortUrlRepository {
  private repository: Repository<ShortUrlEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(ShortUrlEntity);
  }

  async addShortUrl(shortUrl: ShortUrl): Promise<void> {
    if (!shortUrl.shortenedUrl) {
      throw new Error("ShortUrl must have a shortenedUrl");
    }
    if (await this.findShortUrlByShortenedUrl(shortUrl.shortenedUrl)) {
      throw new Error("ShortUrl already exists");
    }

    const shortUrlEntity = ShortUrlMapper.toEntity(shortUrl);

    await this.repository.save(shortUrlEntity);
  }

  async deleteShortUrl(shortenedUrl: string): Promise<void> {
    const shortUrlEntity = await this.repository.findOneBy({ shortenedUrl });
    if (shortUrlEntity) {
      await this.repository.remove(shortUrlEntity);
    }
  }

  async findShortUrlByLongUrl(longUrl: string): Promise<ShortUrl | undefined> {
    const shortUrlEntity = await this.repository.findOneBy({ longUrl });
    return shortUrlEntity ? ShortUrlMapper.toDomain(shortUrlEntity) : undefined;
  }

  async findShortUrlByShortenedUrl(
    shortenedUrl: string
  ): Promise<ShortUrl | undefined> {
    const shortUrlEntity = await this.repository.findOneBy({ shortenedUrl });
    return shortUrlEntity ? ShortUrlMapper.toDomain(shortUrlEntity) : undefined;
  }

  async updateShortUrl(shortUrl: ShortUrl): Promise<void> {
    const shortUrlEntity = await this.repository.findOneBy({
      shortenedUrl: shortUrl.shortenedUrl,
    });
    if (shortUrlEntity) {
      const updatedEntity = Object.assign(
        shortUrlEntity,
        ShortUrlMapper.toEntity(shortUrl)
      );
      await this.repository.save(updatedEntity);
    }
  }
}
