import { ShortUrl } from "../../business/shortUrl";
import { ShortUrlEntity } from "../typeorm/entities/shortUrl.entity";

export class ShortUrlMapper {
  static toDomain(entity: ShortUrlEntity): ShortUrl {
    const domain = new ShortUrl(entity.longUrl, entity.shortenedUrl);
    domain.visitorsCount = entity.visitorsCount;
    return domain;
  }

  static toEntity(domain: ShortUrl): ShortUrlEntity {
    const entity = new ShortUrlEntity();
    entity.longUrl = domain.longUrl;
    entity.shortenedUrl = domain.shortenedUrl;
    entity.visitorsCount = domain.visitorsCount;
    return entity;
  }
}
