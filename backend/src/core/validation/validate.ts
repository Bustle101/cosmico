import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

export async function validateDto(dtoClass: any, obj: any) {
  const dto = plainToInstance(dtoClass, obj);
  const errors = await validate(dto);

  if (errors.length > 0) {
    return errors.map(e => Object.values(e.constraints || {})).flat();
  }

  return null;
}
