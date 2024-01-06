import { AnswersRespository } from "@/domain/forum/application/respositories/answers-repository"
import { Answer } from "@/domain/forum/enterprise/entities/answer"

export class InMemoryAnswersRepository implements AnswersRespository {
    public items: Answer[] = []

    async create(Answer: Answer) {
        this.items.push(Answer)
    }

    async findById(id: string): Promise<Answer | null> {
        const answer = this.items.find(item => item.id.toString() === id)
        if (!answer) return null

        return answer
    }

    async delete(answer: Answer): Promise<void> {
        const itemIndex = this.items.findIndex(item => item.id === answer.id)
        this.items.splice(itemIndex, 1)
    }
}