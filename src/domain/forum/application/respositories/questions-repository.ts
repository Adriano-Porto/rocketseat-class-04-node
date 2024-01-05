import { Question } from "../../enterprise/entities/question"

export interface QuestionsRespository {
    create(question: Question): Promise<void>
}