import { isDate, isNumber } from "class-validator";
import { CardTokenizedEntity } from "../../domain/entities/card-tokenized.entity";
import { ErrorResponseDto } from "../../infraestructure/dto/response/error.res.dto";
import httpStatus from "http-status";

export function CardTokenLife(cardTokenizedEntity: CardTokenizedEntity) {
  const nowTime = new Date();
  const creationTime = cardTokenizedEntity.tokenStarted;

  // Calcula la diferencia en milisegundos
  if (isDate(creationTime) && isNumber(cardTokenizedEntity.tokenTime)) {
    const diffMiliseconds =
      nowTime.getTime() - creationTime.getTime();
    if (diffMiliseconds >= cardTokenizedEntity.tokenTime) {
      throw new ErrorResponseDto(
        {
          message:
            "Los datos de tarjeta proporcionados no están disponibles. Por favor, verifique la información ingresada o intente con otra tarjeta",
        },
        httpStatus.FORBIDDEN
      );
    } else {
      return;
    }
  } else {
    throw new ErrorResponseDto(
      {
        message:
          "Los datos de la tarjeta se guardaron incompletos. Por favor, verifique la información ingresada o intente con otra tarjeta",
      },
      httpStatus.INTERNAL_SERVER_ERROR
    );
  }
}
