import { IsInt, Min, Max } from "class-validator";

export class JwstImagesQuery {
  @IsInt()
  @Min(1)
  @Max(100)
  limit!: number;
}
