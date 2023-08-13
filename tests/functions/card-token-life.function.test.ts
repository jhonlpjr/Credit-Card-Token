import { CardTokenizedEntity } from '../../src/domain/entities/card-tokenized.entity';
import { ErrorResponseDto } from '../../src/infraestructure/dto/response/error.res.dto';
import httpStatus from 'http-status';
import { CardTokenLife } from '../../src/application/functions/card-token-life.function';

describe('CardTokenLife function', () => {
  it('should throw an error if card token time has passed', () => {
    const cardTokenizedEntity: CardTokenizedEntity = {
        tokenStarted: new Date('2023-08-04T12:00:00Z'),
        tokenTime: 5000,
        cardNumber: '6555555555555555',
        cvv: '123',
        expirationMonth: '12',
        expirationYear: '13',
        email: 'email@email.com'
    };

    expect(() => CardTokenLife(cardTokenizedEntity)).toThrow(ErrorResponseDto);
  });

  it('should not throw an error if card token time has not passed', () => {
    const cardTokenizedEntity: CardTokenizedEntity = {
        tokenStarted: new Date(),
        tokenTime: 5000,
        cardNumber: '',
        cvv: '',
        expirationMonth: '',
        expirationYear: '',
        email: ''
    };

    expect(CardTokenLife(cardTokenizedEntity)).toBeUndefined();
  });

  it('should throw an error for incomplete card data', () => {
    const cardTokenizedEntity = new CardTokenizedEntity({});

    expect(() => CardTokenLife(cardTokenizedEntity)).toThrow(ErrorResponseDto);
  });
});