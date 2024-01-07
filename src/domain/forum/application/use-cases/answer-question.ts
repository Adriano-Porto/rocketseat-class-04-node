import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { AnswersRespository } from "@/domain/forum/application/respositories/answers-repository"
import { Answer } from "../../enterprise/entities/answer"
import { Either, right } from "@/core/either"

interface AnswerQuestionUseCaseInput {
    instructorId: string,
    questionId: string,
    content: string
}

type AnswerQuestionUseCaseOutput = Either<null, {
    answer: Answer
}>

export class AnswerQuestionUseCase {
    constructor(private answersRepository: AnswersRespository) {}

    async execute({
        instructorId,
        questionId,
        content
    }: AnswerQuestionUseCaseInput): Promise<AnswerQuestionUseCaseOutput>{
        const answer = Answer.create({
            content,
            authorId: new UniqueEntityID(instructorId),
            questionId: new UniqueEntityID(questionId)
        })

        await this.answersRepository.create(answer)

        return right({ answer })
    }
}