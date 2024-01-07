import { AnswerCommentsRepository } from "../respositories/answer-comments-repository"

interface DeleteAnswerCommentUseCaseInput {
    authorId: string,
    answerCommentId: string,
}

interface DeleteAnswerCommentUseCaseOutput {
}

export class DeleteAnswerCommentUseCase {
    constructor(
        private answerCommentsRepository: AnswerCommentsRepository    
    ) {}

    async execute({
        authorId,
        answerCommentId,
    }: DeleteAnswerCommentUseCaseInput): Promise<DeleteAnswerCommentUseCaseOutput> {
        const answerComment = await this.answerCommentsRepository.findById(answerCommentId)

        if (!answerComment) throw new Error("Answer Comment Not Found")

        if( answerComment.authorId.toString() !== authorId ) {
            throw new Error("Not allowed")
        }

        await this.answerCommentsRepository.delete(answerComment)
        return {}
    }
}