import { Container } from "inversify";
import TYPES from "./types";
import { CardTokenizedMongoRepository } from "../database/repositories/card-tokenized.mongo.repository";
import { CardTokenizedRepository } from "../../domain/repository/card-tokenized.repository";
import { CardTokenizedModel } from "../database/models/card-tokenized.model";
import { GenerateCardTokenUseCase } from "../../application/use-cases/generate-card-token.usecase";
import { GetCardNumberUseCase } from "../../application/use-cases/get-card-number.usecase";

const container: Container = new Container();

container
    .bind<string>(TYPES.connectionString)
    .toConstantValue(
        `mongodb+srv://${process.env.MONGODB}`
    );
container.bind<CardTokenizedRepository>(TYPES.CardTokenizedMongoRepository).to(CardTokenizedMongoRepository);
container.bind<CardTokenizedModel>(TYPES.CardTokenizedModel).to(CardTokenizedModel);
container.bind<GenerateCardTokenUseCase>(TYPES.GenerateCardTokenUseCase).to(GenerateCardTokenUseCase);
container.bind<GetCardNumberUseCase>(TYPES.GetCardNumberUseCase).to(GetCardNumberUseCase);
export default container;