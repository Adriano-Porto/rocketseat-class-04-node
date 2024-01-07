import { QuestionCommentsRepository } from "@/domain/forum/application/respositories/question-comments-repository"
import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment"
export class InMemoryQuestionCommentRepository implements QuestionCommentsRepository {
    public items: QuestionComment[] = []

    async create(questioncommentComment: QuestionComment) {
        this.items.push(questioncommentComment)
    }

    async delete(questioncomment: QuestionComment): Promise<void> {
        const itemIndex = this.items.findIndex(item => item.id === questioncomment.id)
        this.items.splice(itemIndex, 1)
    }

    async findById(id: string): Promise<QuestionComment | null> {
        const questioncomment = this.items.find(item => item.id.toString() === id)
        if (!questioncomment) return null

        return questioncomment
    }
}