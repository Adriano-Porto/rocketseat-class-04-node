import { QuestionsRespository } from "@/domain/forum/application/respositories/questions-repository"
import { Question } from "@/domain/forum/enterprise/entities/question"

export class InMemoryQuestionsRepository implements QuestionsRespository {
    public items: Question[] = []

    async create(question: Question) {
        this.items.push(question)
    }
}