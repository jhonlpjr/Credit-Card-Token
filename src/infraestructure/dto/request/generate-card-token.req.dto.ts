import {
  IsNumberString,
  Length,
  IsEmail,
  Matches,
} from "class-validator";
import { GenerateCardTokenDto } from "../../../domain/dto/generate-card-token.dto";
import { IsLuhn } from "../../../application/decorators/luhn.decorator";
import { IsValidYear } from "../../../application/decorators/valid-year.decorator";
import { ICard } from "../../../domain/interfaces/card.interface";

export class GenerateCardTokenReqDto implements GenerateCardTokenDto {
  @IsNumberString({}, { message: "Ingrese solo números para este campo" })
  @Length(13, 16, {
    message:
      "Ingrese una cantidad válida de números para tarjeta de crédito [13-16]",
  })
  @IsLuhn
  cardNumber: string;
  @IsNumberString({}, { message: "Ingrese solo números para este campo" })
  @Length(3, 4, {
    message: "Ingrese una cantidad válida de números para CVV de crédito [3-4]",
  })
  cvv: string;
  @IsNumberString({}, { message: "Ingrese solo números para este campo" })
  @Length(1, 2, {
    message:
      "Ingrese una cantidad válida de cifras para el numero de mes [1-2]",
  })
  @Matches(/^(?:[1-9]|0?[1-9]|1[0-2])$/, {
    message: "Ingrese un número de mes válido [1-12]",
  })
  expirationMonth: string;
  @IsNumberString({}, { message: "Ingrese solo números para este campo" })
  @Length(4)
  @IsValidYear
  expirationYear: string;
  @Length(5, 100)
  @IsEmail({}, { message: "Ingrese un correo válido" })
  @Matches(/@(gmail\.com|hotmail\.com|yahoo\.es)$/i, {
    message: "El dominio de correo electrónico no es válido.",
  })
  email: string;
  token?: string;
  tokenStarted?: Date;
  tokenTime?: number;

  constructor(
    cardNumber: string,
    cvv: string,
    expirationMonth: string,
    expirationYear: string,
    email: string,
    token?: string,
    tokenStarted?: Date,
    tokenTime?: number,
  ) {
    this.cardNumber = cardNumber;
    this.cvv = cvv;
    this.expirationMonth = expirationMonth;
    this.expirationYear = expirationYear;
    this.email = email;
    this.token = token || "";
    this.tokenStarted = tokenStarted || new Date();
    this.tokenTime = tokenTime || 0;
  }

  setToken(token: string, tokenTime: number = 15 * 60000) {
    this.token = token;
    this.tokenTime = tokenTime;
  }

  getCard() {
    return {
      cardNumber: this.cardNumber,
      cvv: this.cvv,
      email: this.email,
      expirationMonth: this.expirationMonth,
      expirationYear: this.expirationYear,
    } as ICard;
  }
}
