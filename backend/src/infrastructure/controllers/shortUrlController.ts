import { Request, Response } from "express";
import { CreateShortUrlDto } from "../dtos/createShortUrlDto";
import { validate } from "class-validator";
import { ShortUrlService } from "../../business/services/shortUrlService";

export class ShortUrlController {
  private shortUrlService: ShortUrlService;

  constructor(shortUrlService: ShortUrlService) {
    this.shortUrlService = shortUrlService;
  }

  createShortUrl = async (req: Request, res: Response) => {
    try {
      const createShortUrlDto = new CreateShortUrlDto(req.body.longUrl);

      const errors = await validate(createShortUrlDto);
      if (errors.length > 0) {
        return res.status(400).send(errors);
      }

      const shortenedUrl = await this.shortUrlService.createShortUrl(
        createShortUrlDto.longUrl
      );

      if (!shortenedUrl) {
        return res.status(400).json({ message: "Error" });
      }

      return res.status(201).json({ shortenedUrl });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error creating short url" });
    }
  };

  getLongUrlByShortenedUrl = async (req: Request, res: Response) => {
    try {
      const shortenedUrl = req.params.shortenedUrl;

      if (!shortenedUrl) {
        return res.status(400).json({ message: "Shortened URL is required" });
      }

      const longUrl = await this.shortUrlService.getLongUrlByShortenedUrl(
        shortenedUrl
      );

      return res.status(200).json({ longUrl });
    } catch (error: any) {
      if (error.message === "Short URL not found") {
        return res.status(404).json({ message: "Short URL not found" });
      }
      console.log(error);
      res.status(500).json({ message: "Error getting long url" });
    }
  };
}
