import { QuestionsRespository } from "../respositories/questions-repository"

interface DeleteQuestionUseCaseInput {
    questionId: string
    authorId: string
}

interface DeleteQuestionUseCaseOutput {
    
}

export class DeleteQuestionUseCase {
    constructor(private questionsRepository: QuestionsRespository) {}

    async execute({
        questionId,
        authorId
    }: DeleteQuestionUseCaseInput): Promise<DeleteQuestionUseCaseOutput> {
        const question = await this.questionsRepository.findById(questionId)

        if (!question) throw new Error("Question Not Found")

        if(authorId !== question.authorId.toString())
            throw new Error("Now allowed")

        await this.questionsRepository.delete(question)

        return {}
    }
}