import { QuestionsRespository } from "../respositories/questions-repository"
import { QuestionComment } from "../../enterprise/entities/question-comment"
import { QuestionCommentsRepository } from "../respositories/question-comments-repository"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

interface CommentOnQuestionUseCaseInput {
    authorId: string,
    questionId: string,
    content: string,
}

interface CommentOnQuestionUseCaseOutput {
    questionComment: QuestionComment
}

export class CommentOnQuestionUseCase {
    constructor(
        private questionsRepository: QuestionsRespository,
        private questionCommentsRepository: QuestionCommentsRepository    
    ) {}

    async execute({
        authorId,
        questionId,
        content
    }: CommentOnQuestionUseCaseInput): Promise<CommentOnQuestionUseCaseOutput> {
        const question = await this.questionsRepository.findById(questionId)

        if (!question) throw new Error("Question Not Found")

        await this.questionsRepository.create(question)

        const questionComment = QuestionComment.create({
            authorId: new UniqueEntityID(authorId),
            questionId: new UniqueEntityID(questionId),
            content,
        })

        await this.questionCommentsRepository.create(questionComment)

        return { questionComment }
    }
}