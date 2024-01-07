import { QuestionCommentsRepository } from "../respositories/question-comments-repository"

interface DeleteQuestionCommentUseCaseInput {
    authorId: string,
    questionCommentId: string,
}

interface DeleteQuestionCommentUseCaseOutput {
}

export class DeleteQuestionCommentUseCase {
    constructor(
        private questionCommentsRepository: QuestionCommentsRepository    
    ) {}

    async execute({
        authorId,
        questionCommentId,
    }: DeleteQuestionCommentUseCaseInput): Promise<DeleteQuestionCommentUseCaseOutput> {
        const questionComment = await this.questionCommentsRepository.findById(questionCommentId)

        if (!questionComment) throw new Error("Question Comment Not Found")

        if( questionComment.authorId.toString() !== authorId ) {
            throw new Error("Not allowed")
        }

        await this.questionCommentsRepository.delete(questionComment)
        return {}
    }
}