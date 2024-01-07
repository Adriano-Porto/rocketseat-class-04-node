import { AnswerComment } from "../../enterprise/entities/answer-comment"
import { AnswerCommentsRepository } from "../respositories/answer-comments-repository"

interface FetchAnswerUseCaseInput {
    answerId: string
    page: number
}

interface FetchAnswerUseCaseOutput {
    answerComments: AnswerComment[]
}

export class FetchAnswerCommentsUseCase {
    constructor(private answerCommentRepository: AnswerCommentsRepository) {}

    async execute({
        page,
        answerId
    }: FetchAnswerUseCaseInput): Promise<FetchAnswerUseCaseOutput> {
        const answerComments = await this.answerCommentRepository.findManyByAnswerId(answerId, { page })

        return { answerComments }
    }
}