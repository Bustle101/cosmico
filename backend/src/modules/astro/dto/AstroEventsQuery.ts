import { IsISO8601, IsNumberString } from "class-validator";

export class AstroEventsQuery {
  @IsISO8601()
  from!: string;

  @IsISO8601()
  to!: string;

  @IsNumberString()
  lat!: string;

  @IsNumberString()
  lon!: string;
}
