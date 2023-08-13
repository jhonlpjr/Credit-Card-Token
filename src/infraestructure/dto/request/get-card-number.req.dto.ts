import { IsString, Length } from "class-validator";
import { GetCardNumberDto } from "../../../domain/dto/get-card-number.dto";

export class GetCardNumberReqDto implements GetCardNumberDto {
  @IsString({ message: "El token no es válido" })
  @Length(16, 16, { message: "La longitud del token no es válida" })
  token?: string;

  constructor(token?: string) {
    this.token = token;
  }
}
