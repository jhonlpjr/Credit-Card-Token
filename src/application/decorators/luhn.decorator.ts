import luhn from "luhn";

/* eslint-disable */
export function IsLuhn(target: any, propertyKey: string) {
  let val = target[propertyKey];
  const getter = function () {
    return val;
  };
  const setter = function (newVal: any) {
    if (!luhn.validate(newVal)) {
      throw new Error(`Números de tarjeta inválidos`);
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
