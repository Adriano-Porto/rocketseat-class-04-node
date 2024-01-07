import { Either, right } from "@/core/either"
import { Question } from "../../enterprise/entities/question"
import { QuestionsRespository } from "../respositories/questions-repository"

interface FetchRecentQuestionsUseCaseInput {
    page: number
}

type FetchRecentQuestionsUseCaseOutput = Either<null, { 
    questions: Question[]
 }>
export class FetchRecentQuestionsUseCase {
    constructor(private questionsRepository: QuestionsRespository) {}

    async execute({
        page
    }: FetchRecentQuestionsUseCaseInput): Promise<FetchRecentQuestionsUseCaseOutput> {
        const questions = await this.questionsRepository.findManyRecent({ page })

        return right({ questions })
    }
}