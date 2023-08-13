import mongoose, { Model } from 'mongoose';
import { injectable } from "inversify";
import { CardTokenizedEntity } from '../../../domain/entities/card-tokenized.entity';

const cardTokenizedSchema = new mongoose.Schema({
  cardNumber: {
    type: String,
    required: false,
  },
  cvv: {
    type: String,
    required: true,
  },
  expirationMonth: {
    type: String,
    required: true,
  },
  expirationYear: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  tokenStarted: {
    type: Date,
    default: Date.now,
    required: true,
  },
  tokenTime: {
    type: Number,
    required: true,
  },
});

// const CardTokenModel = mongoose.model<ICardTokenizedModel>('Token', cardTokenizedSchema);

// @injectable()
// export default CardTokenModel;

@injectable()
export class CardTokenizedModel {
  private model: Model<CardTokenizedEntity>;

  constructor() {
    this.model = mongoose.model<CardTokenizedEntity>('Token', cardTokenizedSchema);
  }

  public getModel(): Model<CardTokenizedEntity> {
    return this.model;
  }
}
