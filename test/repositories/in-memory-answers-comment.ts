import { AnswerCommentsRepository } from "@/domain/forum/application/respositories/answer-comments-repository"
import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment"

export class InMemoryAnswerCommentsRepository implements AnswerCommentsRepository {
    public items: AnswerComment[] = []

    async create(answerComment: AnswerComment) {
        this.items.push(answerComment)
    }

    async delete(answercomment: AnswerComment): Promise<void> {
        const itemIndex = this.items.findIndex(item => item.id === answercomment.id)
        this.items.splice(itemIndex, 1)
    }

    async findById(id: string): Promise<AnswerComment | null> {
        const answercomment = this.items.find(item => item.id.toString() === id)
        if (!answercomment) return null

        return answercomment
    }
    
}