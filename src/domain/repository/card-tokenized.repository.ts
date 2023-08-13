import { CardTokenizedEntity } from "../entities/card-tokenized.entity";
import { ICardTokenized } from "../interfaces/card-tokenized.interface";

export interface CardTokenizedRepository {
    createCardTokenized(cardTokenized: ICardTokenized): Promise<CardTokenizedEntity>;
    upsertCardTokenized(cardTokenized: Partial<ICardTokenized>): Promise<CardTokenizedEntity>;
    getCardTokenized(cardTokenized: Partial<ICardTokenized>): Promise<CardTokenizedEntity>;
}