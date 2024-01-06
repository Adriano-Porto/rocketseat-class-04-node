import { Answer } from "../../enterprise/entities/answer"
import { AnswersRespository } from "../respositories/answers-repository"

interface EditAnswerUseCaseInput {
    authorId: string
    answerId: string
    content: string
}

interface EditAnswerUseCaseOutput {
    answer: Answer
}

export class EditAnswerUseCase {
    constructor(private answersRepository: AnswersRespository) {}

    async execute({
        authorId,
        content,
        answerId
    }: EditAnswerUseCaseInput): Promise<EditAnswerUseCaseOutput> {
        const answer = await this.answersRepository.findById(answerId)

        if (!answer) throw new Error("Answer Not Found")

        if(authorId !== answer.authorId.toString())
            throw new Error("Now allowed")

        answer.content = content

        await this.answersRepository.save(answer)

        return { answer }
    }
}