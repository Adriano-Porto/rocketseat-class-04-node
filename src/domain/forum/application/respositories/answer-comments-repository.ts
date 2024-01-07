import { AnswerComment } from "../../enterprise/entities/answer-comment"

export interface AnswerCommentsRepository {
    create(question: AnswerComment): Promise<void>
}