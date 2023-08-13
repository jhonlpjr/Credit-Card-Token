import { CARD_TOKEN_FUNCTIONS } from "../../src/application/functions/card-token.function";
import { ICard } from "../../src/domain/interfaces/card.interface";

describe('Card token functions', () => {
  it('should tokenize card data correctly', () => {
    const card: ICard = {
      cardNumber: '1234567890123456',
      cvv: '123',
      expirationMonth: '01',
      expirationYear: '23',
      email: 'test@example.com'
    };

    const token = CARD_TOKEN_FUNCTIONS.tokenizeCardData(card);
    expect(token).toBe('12345678901234561230123test@example.com');
  });

  it('should encrypt card data correctly', () => {
    const card: ICard = {
      cardNumber: '1234567890123456',
      cvv: '123',
      expirationMonth: '01',
      expirationYear: '23',
      email: 'test@example.com'
    };

    const encryptedToken = CARD_TOKEN_FUNCTIONS.encryptCardDataLong16(card);
    expect(encryptedToken).toHaveLength(16);
  });

  it('should produce different encrypted tokens for different cards', () => {
    const card1: ICard = {
      cardNumber: '1234567890123456',
      cvv: '123',
      expirationMonth: '01',
      expirationYear: '23',
      email: 'test@example.com'
    };

    const card2: ICard = {
      cardNumber: '6543210987654321',
      cvv: '321',
      expirationMonth: '12',
      expirationYear: '34',
      email: 'test2@example.com'
    };

    const encryptedToken1 = CARD_TOKEN_FUNCTIONS.encryptCardDataLong16(card1);
    const encryptedToken2 = CARD_TOKEN_FUNCTIONS.encryptCardDataLong16(card2);
    expect(encryptedToken1).not.toBe(encryptedToken2);
  });

  it('should produce the same encrypted token for the same card data', () => {
    const card: ICard = {
      cardNumber: '1234567890123456',
      cvv: '123',
      expirationMonth: '01',
      expirationYear: '23',
      email: 'test@example.com'
    };

    const encryptedToken1 = CARD_TOKEN_FUNCTIONS.encryptCardDataLong16(card);
    const encryptedToken2 = CARD_TOKEN_FUNCTIONS.encryptCardDataLong16(card);
    expect(encryptedToken1).toBe(encryptedToken2);
  });

  it('should produce different encrypted tokens for cards with different card numbers', () => {
    const card1: ICard = {
      cardNumber: '1234567890123456',
      cvv: '123',
      expirationMonth: '01',
      expirationYear: '23',
      email: 'test@example.com'
    };

    const card2: ICard = {
      ...card1,
      cardNumber: '6543210987654321'
    };

    const encryptedToken1 = CARD_TOKEN_FUNCTIONS.encryptCardDataLong16(card1);
    const encryptedToken2 = CARD_TOKEN_FUNCTIONS.encryptCardDataLong16(card2);
    expect(encryptedToken1).not.toBe(encryptedToken2);
  });

  it('should produce different encrypted tokens for cards with different expiration dates', () => {
    const card1: ICard = {
      cardNumber: '1234567890123456',
      cvv: '123',
      expirationMonth: '01',
      expirationYear: '23',
      email: 'test@example.com'
    };

    const card2: ICard = {
      ...card1,
      expirationMonth: '12',
      expirationYear: '34'
    };

    const encryptedToken1 = CARD_TOKEN_FUNCTIONS.encryptCardDataLong16(card1);
    const encryptedToken2 = CARD_TOKEN_FUNCTIONS.encryptCardDataLong16(card2);
    expect(encryptedToken1).not.toBe(encryptedToken2);
  });
});
