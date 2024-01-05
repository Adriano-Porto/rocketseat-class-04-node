import { AnswersRespository } from "@/domain/forum/application/respositories/answers-repository"
import { Answer } from "@/domain/forum/enterprise/entities/answer"

export class InMemoryAnswersRepository implements AnswersRespository {
    public items: Answer[] = []

    async create(Answer: Answer) {
        this.items.push(Answer)
    }
}