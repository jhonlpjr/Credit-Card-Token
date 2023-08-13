import "reflect-metadata"; // Importar para que inversify funcione con TypeScript
import { APIGatewayProxyEvent } from "aws-lambda";
import { generateCardTokenLambda } from "./infraestructure/lambdas/generate-card-token-lambda.function";
import { getCardNumberLambda } from "./infraestructure/lambdas/get-card-number-lambda.function";

// Carga las variables de entorno desde el archivo .env
require('dotenv').config()
// Configura tus credenciales de AWS aquí
// ...
const mongodbConnectionString = process.env.MONGODB;
exports.generateCardTokenLambdaHandler = (event: APIGatewayProxyEvent) => {
  return generateCardTokenLambda(event);
};
exports.getCardNumberLambdaHandler = (event: APIGatewayProxyEvent) => {
  return getCardNumberLambda(event);
};
