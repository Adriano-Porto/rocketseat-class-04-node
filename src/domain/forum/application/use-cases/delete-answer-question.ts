import { AnswersRespository } from "../respositories/answers-repository"

interface DeleteAnswerUseCaseInput {
    answerId: string
    authorId: string
}

interface DeleteAnswerUseCaseOutput {
    
}

export class DeleteAnswerUseCase {
    constructor(private answersRepository: AnswersRespository) {}

    async execute({
        answerId,
        authorId
    }: DeleteAnswerUseCaseInput): Promise<DeleteAnswerUseCaseOutput> {
        const answer = await this.answersRepository.findById(answerId)

        if (!answer) throw new Error("Answer Not Found")

        if(authorId !== answer.authorId.toString())
            throw new Error("Now allowed")

        await this.answersRepository.delete(answer)

        return {}
    }
}