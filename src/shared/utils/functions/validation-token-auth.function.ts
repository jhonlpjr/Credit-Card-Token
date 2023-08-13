import httpStatus from "http-status";
import { ErrorResponseDto } from "../../../infraestructure/dto/response/error.res.dto";
import { isString } from "class-validator";
import { APIGatewayProxyEvent } from "aws-lambda";

export function ValidationTokenAuth(event: APIGatewayProxyEvent) {
  // Obtener el token de autenticación del encabezado
  const headerAuthorization = event.headers["Authorization"];
  if (isString(headerAuthorization) && headerAuthorization.length > 0) {
    const token = headerAuthorization.replace("Bearer ", "");
    if (!token || !token.startsWith("pk_")) {
      throw new ErrorResponseDto(
        {
          message: "Token de autenticación inválido o ausente.",
        },
        httpStatus.FORBIDDEN
      );
    } else {
        return;
    }
  } else {
    throw new ErrorResponseDto(
        {
          message: "Token de autenticación inválido o ausente.",
        },
        httpStatus.FORBIDDEN
      );
  }
}
