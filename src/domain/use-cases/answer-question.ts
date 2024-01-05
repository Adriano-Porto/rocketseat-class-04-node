import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { AnswersRespository } from "@/respositories/answers-repository"
import { Answer } from "../entities/answer"

interface AnswerQuestionUseCaseInput {
    instructorId: string,
    questionId: string,
    content: string
}

export class AnswerQuestionUseCase {
    constructor(private answersRepository: AnswersRespository) {}

    async execute({
        instructorId,
        questionId,
        content
    }: AnswerQuestionUseCaseInput) {
        const answer = Answer.create({
            content,
            authorId: new UniqueEntityID(instructorId),
            questionId: new UniqueEntityID(questionId)
        })

        await this.answersRepository.create(answer)

        return answer
    }
}