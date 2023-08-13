import { ICard } from "./card.interface";
import { IToken } from "./token.interface";

export interface ICardTokenized extends ICard, IToken {}