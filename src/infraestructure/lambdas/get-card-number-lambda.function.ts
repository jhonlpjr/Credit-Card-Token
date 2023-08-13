import { APIGatewayProxyEvent } from "aws-lambda";
import { GetCardNumberUseCase } from "../../application/use-cases/get-card-number.usecase";
import { ValidationProperties } from "../../shared/utils/functions/validation-properties.function";
import { ValidationTokenAuth } from "../../shared/utils/functions/validation-token-auth.function";
import container from "../config/inversify.config";
import TYPES from "../config/types";
import { GetCardNumberReqDto } from "../dto/request/get-card-number.req.dto";
import { ErrorResponseDto } from "../dto/response/error.res.dto";
import { VerificateEmptyProperties } from "../../shared/utils/functions/validate";

export async function getCardNumberLambda(event: APIGatewayProxyEvent) {
  try {
    //Validar Token
    ValidationTokenAuth(event);

    //Validar propiedades de Request
    const parameters = event.queryStringParameters;
    const tokenString =
      parameters &&
      !VerificateEmptyProperties(parameters) &&
      "token" in parameters
        ? parameters["token"]
        : "";
    const dto = new GetCardNumberReqDto(tokenString);
    await ValidationProperties(dto);

    // Resolver la dependencia y obtener una instancia del caso de uso
    // Crear un contenedor inversify y vincular las dependencias
    const getCardNumberUseCase = container.get<GetCardNumberUseCase>(
      TYPES.GetCardNumberUseCase
    );
    // Llamar al caso de uso
    const response = await getCardNumberUseCase.handle(dto);

    return response; // Retorna la respuesta de la función Lambda
  } catch (error) {
    console.error("Error al llamar a la función Lambda:", error);

    if (error instanceof ErrorResponseDto) {
      return error;
    } else {
      return new ErrorResponseDto({
        message: `${error}`,
      });
    }
  }
}
