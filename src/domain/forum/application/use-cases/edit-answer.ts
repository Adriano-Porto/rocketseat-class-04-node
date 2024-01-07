import { Either, left, right } from "@/core/either"
import { Answer } from "../../enterprise/entities/answer"
import { AnswersRespository } from "../respositories/answers-repository"
import { NotAllowedError } from "./errors/not-allowed-error"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

interface EditAnswerUseCaseInput {
    authorId: string
    answerId: string
    content: string
}

type EditAnswerUseCaseOutput = Either<
ResourceNotFoundError | NotAllowedError, { 
    answer: Answer
 }>
export class EditAnswerUseCase {
    constructor(private answersRepository: AnswersRespository) {}

    async execute({
        authorId,
        content,
        answerId
    }: EditAnswerUseCaseInput): Promise<EditAnswerUseCaseOutput> {
        const answer = await this.answersRepository.findById(answerId)

        if (!answer)
            return left(new ResourceNotFoundError())

        if(authorId !== answer.authorId.toString())
            return left(new NotAllowedError())

        answer.content = content

        await this.answersRepository.save(answer)

        return right({ answer })
    }
}