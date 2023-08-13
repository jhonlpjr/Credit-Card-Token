import { GenerateCardTokenUseCase } from "../../application/use-cases/generate-card-token.usecase";
import { GenerateCardTokenDto } from "../../domain/dto/generate-card-token.dto";
import container from "../config/inversify.config";
import TYPES from "../config/types";
import { GenerateCardTokenReqDto } from "../dto/request/generate-card-token.req.dto";
import { ErrorResponseDto } from "../dto/response/error.res.dto";
import { ValidationProperties } from "../../shared/utils/functions/validation-properties.function";
import { ValidationTokenAuth } from "../../shared/utils/functions/validation-token-auth.function";
import { APIGatewayProxyEvent } from "aws-lambda";
import { isString } from "class-validator";

export async function generateCardTokenLambda(event: APIGatewayProxyEvent) {
  try {
    //Validar Token
    ValidationTokenAuth(event);
    //Validar propiedades de Request
    const body: GenerateCardTokenDto =
      isString(event.body) && event.body.length > 0
        ? JSON.parse(event.body)
        : {};
    const dto = new GenerateCardTokenReqDto(
      body.cardNumber,
      body.cvv,
      body.expirationMonth,
      body.expirationYear,
      body.email
    );
    await ValidationProperties(dto);

    // Resolver la dependencia y obtener una instancia del caso de uso
    // Crear un contenedor inversify y vincular las dependencias
    const generateCardTokenUseCase = container.get<GenerateCardTokenUseCase>(
      TYPES.GenerateCardTokenUseCase
    );
    // Llamar al caso de uso
    const response = await generateCardTokenUseCase.handle(dto);

    return response; // Retorna la respuesta de la función Lambda
  } catch (error) {
    if (error instanceof ErrorResponseDto) {
      return error;
    } else {
      return new ErrorResponseDto({
        message: `${error}`,
      });
    }
  }
}
