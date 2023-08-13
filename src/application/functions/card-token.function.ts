import crypto from "crypto";
import CryptoJS from "crypto-js";
import { ICard } from "../../domain/interfaces/card.interface";
/* eslint-disable */
export namespace CARD_TOKEN_FUNCTIONS {
  const secretKeyToken = process.env.DB_HOST || "secret";

  // Función para encriptar los datos de la tarjeta y generar el token
  export function encryptCardData(card: ICard): string {
    const token = crypto.randomBytes(16).toString("hex");
    const tokenData = tokenizeCardData(card);
    const encryptedToken = CryptoJS.AES.encrypt(
      token + tokenData,
      secretKeyToken
    ).toString();
    return encryptedToken;
  }

  // Función para desencriptar el token y obtener los datos de la tarjeta
  export function decryptToken(encryptedToken: string): ICard {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedToken, secretKeyToken);
    const decryptedToken = decryptedBytes.toString(CryptoJS.enc.Utf8);

    // Una vez desencriptado el token, extraemos los datos de la tarjeta
    const card: ICard = {
      cardNumber: decryptedToken.substring(0, 16),
      cvv: decryptedToken.substring(16, 19),
      expirationMonth: decryptedToken.substring(19, 21),
      expirationYear: decryptedToken.substring(21, 25),
      email: decryptedToken.substring(25),
    };

    return card;
  }

  // Función para tokenizar los datos de la tarjeta
  export function tokenizeCardData(card: ICard): string {
    const tokenData = `${card.cardNumber}${card.cvv}${card.expirationMonth}${card.expirationYear}${card.email}`;
    return tokenData;
  }

  export function encryptCardDataLong16(card: ICard): string {
    const tokenData = tokenizeCardData(card);
    const md5sum = crypto.createHash("md5");
    md5sum.update(tokenData);
    const encryptedToken = md5sum.digest("hex").substr(0, 16);
    return encryptedToken;
  }
}


