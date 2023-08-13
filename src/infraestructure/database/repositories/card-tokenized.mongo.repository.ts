import { inject, injectable } from "inversify";
import { CardTokenizedEntity } from "../../../domain/entities/card-tokenized.entity";
import { CardTokenizedRepository } from "../../../domain/repository/card-tokenized.repository";
import { CardTokenizedModel } from "../models/card-tokenized.model";
import { ICardTokenized } from "../../../domain/interfaces/card-tokenized.interface";
import TYPES from "../../config/types";
import { connect } from "mongoose";

@injectable()
export class CardTokenizedMongoRepository implements CardTokenizedRepository {
  constructor(
    @inject(TYPES.connectionString) private connectionString: string,
    @inject(TYPES.CardTokenizedModel) private model: CardTokenizedModel
  ) {}
  async createCardTokenized(
    cardTokenized: ICardTokenized
  ): Promise<CardTokenizedEntity> {
    try {
      const connection = await connect(this.connectionString);
      const model = this.model.getModel();
      const newCardTokenizedEntity = new CardTokenizedEntity(cardTokenized);
      const cardTokenizedData = await model.create(newCardTokenizedEntity);
      await connection.disconnect();
      return cardTokenizedData;
    } catch (error) {
      throw new Error(
        `Error al intentar guardar tarjeta tokenizada. Error en BD: ${error}`
      );
    }
  }

  async upsertCardTokenized(cardTokenized: Partial<ICardTokenized>): Promise<CardTokenizedEntity> {
    try {
      const connection = await connect(this.connectionString);
      const model = this.model.getModel();
      const newCardTokenizedEntity = new CardTokenizedEntity(cardTokenized);
      const cardTokenizedData = await model.findOneAndUpdate({token: cardTokenized.token}, cardTokenized, {upsert: true});
      await connection.disconnect();
      return new CardTokenizedEntity({
        cardNumber: cardTokenizedData?.cardNumber || cardTokenized.cardNumber,
        cvv: cardTokenizedData?.cvv || cardTokenized.cvv,
        email: cardTokenizedData?.email || cardTokenized.email,
        expirationMonth: cardTokenizedData?.expirationMonth || cardTokenized.expirationMonth,
        expirationYear: cardTokenizedData?.expirationYear || cardTokenized.expirationYear,
        token: cardTokenizedData?.token || cardTokenized.token,
        tokenStarted: cardTokenizedData?.tokenStarted || cardTokenized.tokenStarted,
        tokenTime: cardTokenizedData?.tokenTime || cardTokenized.tokenTime
      });
    } catch (error) {
      throw new Error(
        `Error al intentar guardar tarjeta tokenizada. Error en BD: ${error}`
      );
    }
  }

  async getCardTokenized(
    cardTokenized: Partial<ICardTokenized>
  ): Promise<CardTokenizedEntity> {
    try {
      const connection = await connect(this.connectionString);
      const model = this.model.getModel();
      const cardTokenizedData = await model
        .findOne({ ...cardTokenized })
        .lean();
      await connection.disconnect();
      return new CardTokenizedEntity({
        cardNumber: cardTokenizedData?.cardNumber,
        cvv: cardTokenizedData?.cvv,
        email: cardTokenizedData?.email,
        expirationMonth: cardTokenizedData?.expirationMonth,
        expirationYear: cardTokenizedData?.expirationYear,
        token: cardTokenizedData?.token,
        tokenStarted: cardTokenizedData?.tokenStarted,
        tokenTime: cardTokenizedData?.tokenTime
      });
    } catch (error) {
      throw new Error(
        `Error al intentar guardar tarjeta tokenizada. Error en BD: ${error}`
      );
    }
  }
}
