import { inject, injectable } from "inversify";
import { CardTokenizedRepository } from "../../domain/repository/card-tokenized.repository";
import { SuccessResponseDto } from "../../infraestructure/dto/response/succes.res.dto";
import { ErrorResponseDto } from "../../infraestructure/dto/response/error.res.dto";
import TYPES from "../../infraestructure/config/types";
import { GetCardNumberReqDto } from "../../infraestructure/dto/request/get-card-number.req.dto";
import { CardTokenLife } from "../functions/card-token-life.function";

@injectable()
export class GetCardNumberUseCase {
  constructor(
    @inject(TYPES.CardTokenizedMongoRepository)
    private cardTokenizedRepository: CardTokenizedRepository
  ) {}
  async handle(dto: GetCardNumberReqDto): Promise<SuccessResponseDto> {
    try {
      const cardTokenized = await this.cardTokenizedRepository.getCardTokenized(
        dto
      );
      CardTokenLife(cardTokenized);
      return new SuccessResponseDto({
        message: "Se obtuvo datos de la tarjeta con éxito",
        data: { cardNumber: cardTokenized.cardNumber },
      });
    } catch (error) {
      throw new ErrorResponseDto({
        message: "Error al intentar obtener datos de la tarjeta",
        errorMessage: `${error}`,
      });
    }
  }
}
