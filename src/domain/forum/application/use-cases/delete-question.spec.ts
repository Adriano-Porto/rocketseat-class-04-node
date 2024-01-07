import { expect, describe, it } from "vitest"
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository"
import { DeleteQuestionUseCase } from "./delete-question"
import { makeQuestion } from "test/factories/make-question"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase

describe("Delete Question UseCase", () => {
    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
        sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
    })
    it("should be able to delete question", async () => {
        const newQuestion = await makeQuestion({
            authorId: new UniqueEntityID("author-1")
        }, new UniqueEntityID("question-1"))
        
        await inMemoryQuestionsRepository.create(newQuestion)

        await sut.execute({
            questionId: "question-1",
            authorId: "author-1"
        })

        expect(inMemoryQuestionsRepository.items).toHaveLength(0)
    })
    it("should not be able to delete question from a different author", async () => {
        const newQuestion = await makeQuestion({
            authorId: new UniqueEntityID("author-1")
        }, new UniqueEntityID("question-1"))
        
        await inMemoryQuestionsRepository.create(newQuestion)

        const result = await sut.execute({
            questionId: "question-1",
            authorId: "author-2"
        })

        expect(result.isLeft()).toBe(true)
        expect(inMemoryQuestionsRepository.items).toHaveLength(1)
    })
    
})