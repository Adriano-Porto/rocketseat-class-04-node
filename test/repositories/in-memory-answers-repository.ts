import { PaginationParams } from "@/core/repositories/pagination-params"
import { AnswersRespository } from "@/domain/forum/application/respositories/answers-repository"
import { Answer } from "@/domain/forum/enterprise/entities/answer"

export class InMemoryAnswersRepository implements AnswersRespository {
    public items: Answer[] = []

    async create(Answer: Answer) {
        this.items.push(Answer)
    }

    async save(answer: Answer) {
        const itemIndex = this.items.findIndex((item) => item.id === answer.id)
        this.items[itemIndex] = answer
    }
    
    async delete(answer: Answer): Promise<void> {
        const itemIndex = this.items.findIndex(item => item.id === answer.id)
        this.items.splice(itemIndex, 1)
    }

    async findById(id: string): Promise<Answer | null> {
        const answer = this.items.find(item => item.id.toString() === id)
        if (!answer) return null

        return answer
    }

    async findManyByQuestionId(questionId: string, { page }: PaginationParams): Promise<Answer[]> {
        const answers = await this.items
            .filter((item) => item.questionId.toString() === questionId)
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            .slice((page -1 ) * 20, page * 20)

        return answers
    }

}