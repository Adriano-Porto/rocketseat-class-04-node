import { Question } from "../../enterprise/entities/question"
import { QuestionsRespository } from "../respositories/questions-repository"

interface GetQuestionBySlugUseCaseInput {
    slug: string
}

interface GetQuestionBySlugUseCaseOutput {
    question: Question
}

export class GetQuestionBySlugUseCase {
    constructor(private questionsRepository: QuestionsRespository) {}

    async execute({
        slug
    }: GetQuestionBySlugUseCaseInput): Promise<GetQuestionBySlugUseCaseOutput> {
        const question = await this.questionsRepository.findBySlug(slug)

        if (question === null) throw new Error("Question Not Found")

        return { question }
    }
}