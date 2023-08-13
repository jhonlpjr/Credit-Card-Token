import { inject, injectable } from "inversify";
import { CardTokenizedRepository } from "../../domain/repository/card-tokenized.repository";
import { SuccessResponseDto } from "../../infraestructure/dto/response/succes.res.dto";
import { GenerateCardTokenReqDto } from "../../infraestructure/dto/request/generate-card-token.req.dto";
import { CARD_TOKEN_FUNCTIONS } from "../functions/card-token.function";
import { ErrorResponseDto } from "../../infraestructure/dto/response/error.res.dto";
import TYPES from "../../infraestructure/config/types";

@injectable()
export class GenerateCardTokenUseCase {
  constructor(
    @inject(TYPES.CardTokenizedMongoRepository)
    private cardTokenizedRepository: CardTokenizedRepository
  ) {}
  async handle(dto: GenerateCardTokenReqDto): Promise<SuccessResponseDto> {
    try {
      const tokenCard = CARD_TOKEN_FUNCTIONS.encryptCardDataLong16(dto.getCard());
      dto.setToken(tokenCard);
      const cardTokenized =
        await this.cardTokenizedRepository.upsertCardTokenized(dto);
      return new SuccessResponseDto({
        message: "Token para tarjeta generado",
        data: { token: cardTokenized.token },
      });
    } catch (error) {
      throw new ErrorResponseDto({
        message: "Error al intentar guardar tarjeta tokenizada2",
        errorMessage: `${error}`,
      });
    }
  }
}
