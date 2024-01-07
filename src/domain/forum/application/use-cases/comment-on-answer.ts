import { AnswersRespository } from "../respositories/answers-repository"
import { AnswerComment } from "../../enterprise/entities/answer-comment"
import { AnswerCommentsRepository } from "../respositories/answer-comments-repository"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

interface CommentOnAnswerUseCaseInput {
    authorId: string,
    answerId: string,
    content: string,
}

interface CommentOnAnswerUseCaseOutput {
    answerComment: AnswerComment
}

export class CommentOnAnswerUseCase {
    constructor(
        private answersRepository: AnswersRespository,
        private answerCommentsRepository: AnswerCommentsRepository    
    ) {}

    async execute({
        authorId,
        answerId,
        content
    }: CommentOnAnswerUseCaseInput): Promise<CommentOnAnswerUseCaseOutput> {
        const answer = await this.answersRepository.findById(answerId)

        if (!answer) throw new Error("Answer Not Found")

        await this.answersRepository.create(answer)

        const answerComment = AnswerComment.create({
            authorId: new UniqueEntityID(authorId),
            answerId: new UniqueEntityID(answerId),
            content,
        })

        await this.answerCommentsRepository.create(answerComment)

        return { answerComment }
    }
}