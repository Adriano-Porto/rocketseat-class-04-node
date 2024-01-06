import { Question } from "../../enterprise/entities/question"
import { QuestionsRespository } from "../respositories/questions-repository"
import { AnswersRespository } from "../respositories/answers-repository"

interface ChooseQuestionBestAnswerUseCaseInput {
    authorId: string,
    answerId: string,
}

interface ChooseQuestionBestAnswerUseCaseOutput {
    question: Question
}

export class ChooseQuestionBestAnswerUseCase {
    constructor(
        private questionsRepository: QuestionsRespository,
        private answersRepository: AnswersRespository,
    ) {}

    async execute({
        authorId,
        answerId,
    }: ChooseQuestionBestAnswerUseCaseInput): Promise<ChooseQuestionBestAnswerUseCaseOutput> {
        const answer = await this.answersRepository.findById(answerId)

        if (!answer) throw new Error("Answer Not found")

        const question = await this.questionsRepository.findById(answer.questionId.toString())

        if (!question) {
            throw new Error("Question not found")
        }

        if (authorId !== question.authorId.toString())
            throw new Error("Not Allowed")

        question.bestAnswerId = answer.id

        await this.questionsRepository.save(question)


        return { question }
    }
}