import { IsInt, Min } from "class-validator";

export class OsdrQuery {
  @IsInt()
  @Min(1)
  limit!: number;
}
