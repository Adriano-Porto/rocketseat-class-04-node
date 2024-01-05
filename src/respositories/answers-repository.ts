import { Answer } from "../domain/entities/answer"

export interface AnswersRespository {
    create(answer: Answer): Promise<void>
}