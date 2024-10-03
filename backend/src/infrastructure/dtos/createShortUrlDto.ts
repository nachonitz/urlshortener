import { IsEmail, IsInt, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateShortUrlDto {
  @IsNotEmpty()
  @IsString()
  longUrl: string;

  constructor(longUrl: string) {
    this.longUrl = longUrl;
  }
}
