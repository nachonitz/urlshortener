export class ShortUrl {
  longUrl: string;
  shortenedUrl: string;
  visitorsCount: number;

  constructor(longUrl: string, shortenedUrl: string) {
    this.longUrl = longUrl;
    this.shortenedUrl = shortenedUrl;
    this.visitorsCount = 0;
  }

  increaseVisitorsCount() {
    this.visitorsCount++;
  }

  getVisitorsCount() {
    return this.visitorsCount;
  }
}
