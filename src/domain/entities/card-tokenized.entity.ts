import { ICardTokenized } from "../interfaces/card-tokenized.interface";

export class CardTokenizedEntity implements ICardTokenized {
  cardNumber: string;
  cvv: string;
  expirationMonth: string;
  expirationYear: string;
  email: string;
  token?: string;
  tokenStarted?: Date;
  tokenTime?: number;

  constructor(partial: Partial<CardTokenizedEntity>) {
    this.cardNumber = partial.cardNumber || "";
    this.cvv = partial.cvv || "";
    this.email = partial.email || "";
    this.expirationMonth = partial.expirationMonth || "";
    this.expirationYear = partial.expirationYear || "";
    this.token = partial.token || "";
    this.tokenStarted = partial.tokenStarted || new Date();
    this.tokenTime = partial.tokenTime || 0;
  }
}
