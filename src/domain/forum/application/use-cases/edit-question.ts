import { Question } from "../../enterprise/entities/question"
import { QuestionsRespository } from "../respositories/questions-repository"

interface EditQuestionUseCaseInput {
    authorId: string
    title: string
    questionId: string
    content: string
}

interface EditQuestionUseCaseOutput {
    question: Question
}

export class EditQuestionUseCase {
    constructor(private questionsRepository: QuestionsRespository) {}

    async execute({
        questionId,
        authorId,
        title,
        content
    }: EditQuestionUseCaseInput): Promise<EditQuestionUseCaseOutput> {
        const question = await this.questionsRepository.findById(questionId)

        if (!question) throw new Error("Question Not Found")

        if(authorId !== question.authorId.toString())
            throw new Error("Now allowed")

        question.title = title
        question.content = content

        await this.questionsRepository.save(question)

        return { question }
    }
}