import { ErrorResponseDto } from "../../infraestructure/dto/response/error.res.dto";
/* eslint-disable */
export function IsValidYear(target: any, propertyKey: string) {
  let val = target[propertyKey];
  const nowYear = new Date().getFullYear();
  const difYear = val - nowYear;

  const getter = function () {
    return val;
  };

  const setter = function (newVal: any) {
    if (difYear < 0 || difYear > 5) {
      return new ErrorResponseDto({
        message: "Año de tarjeta inválido",
      });
    } 
    val = newVal;
  };

  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true,
  });
}