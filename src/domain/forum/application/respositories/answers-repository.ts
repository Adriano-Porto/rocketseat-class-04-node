import { Answer } from "../../enterprise/entities/answer"

export interface AnswersRespository {
    create(answer: Answer): Promise<void>
}