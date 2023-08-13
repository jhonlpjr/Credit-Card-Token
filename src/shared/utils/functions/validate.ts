/* eslint-disable */
export default function Verificate(value: any) {
  if (value != null && value != undefined) {
    return value;
  } else {
    return null;
  }
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function VerificateEmptyProperties(obj: Object) {
  if (Verificate(obj)) {
    if (Object.values(obj).length > 0) {
      return false;
    } else {
      return true;
    }
  } else {
    return true;
  }
}

/** DEFAULT - VERIFICATE FUNCTIONS */

export function DefaultValue(value: any, defaultVal: any) {
  if (value != defaultVal) {
    return value;
  } else {
    return defaultVal;
  }
}

export function VerificateDefault(variable: any, defaultVar: any) {
  if (variable != null && variable != undefined && variable != defaultVar) {
    return variable;
  } else {
    return defaultVar;
  }
}

export function VerificateDefaultObject(obj: object, defaultObj: object = {}) {
  if (VerificateEmptyProperties(obj)) {
    if (obj != defaultObj) return obj;
  }
  return defaultObj;
}

export function VerificateDefaultNumber(variable: number, defaultVar = 1) {
  return VerificateDefault(variable, defaultVar);
}

export function VerificateMinNumber(variable: number, defaultVar = 1) {
  const num = VerificateDefaultNumber(variable);
  const defaultNum = VerificateDefaultNumber(defaultVar);
  return num < defaultNum ? defaultNum : num;
}

export function VerificateMaxNumber(variable: number, defaultVar = 1) {
  const num = VerificateDefaultNumber(variable);
  const defaultNum = VerificateDefaultNumber(defaultVar);
  return num > defaultNum ? defaultNum : num;
}

export function VerificatePositiveNumber(variable: number) {
  if (Verificate(variable)) {
    if (variable > 0) {
      return true;
    }
    return false;
  }
  return false;
}

export function VerificateDefaultString(variable: string, defaultVar = '') {
  return VerificateDefault(variable, defaultVar) as string;
}

export function VerificateString(variable: string, defaultVar = '') {
  const verString = VerificateDefault(variable, defaultVar);
  if (verString.length > 0) {
    return verString;
  }
  return false;
}

export function VerificateLang(lang: string, defaultLang: string) {
  const preVerificateLang = VerificateString(lang, defaultLang);
  if (preVerificateLang.length > 4) {
    return defaultLang;
  }
  return preVerificateLang;
}

export function ValMinArray(arr: any[], minQuantityElement = 1) {
  if (arr != null && arr != undefined && arr.length >= minQuantityElement) {
    return true;
  }
  return false;
}