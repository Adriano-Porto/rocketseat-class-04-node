import { expect, describe, it } from "vitest"
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository"
import { EditQuestionUseCase } from "./edit-question"
import { makeQuestion } from "test/factories/make-question"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe("Edit Question UseCase", () => {
    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
        sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
    })
    it("should be able to edit question", async () => {
        const newQuestion = await makeQuestion({
            authorId: new UniqueEntityID("author-1")
        }, new UniqueEntityID("question-1"))
        
        await inMemoryQuestionsRepository.create(newQuestion)

        await sut.execute({
            questionId: "question-1",
            authorId: "author-1",
            title: "hello",
            content: "world"
        })

        expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
            title: "hello",
            content: "world"
        })
    })
    it("should not be able to edit question from a different author", async () => {
        const newQuestion = await makeQuestion({
            authorId: new UniqueEntityID("author-1")
        }, new UniqueEntityID("question-1"))
        
        await inMemoryQuestionsRepository.create(newQuestion)

        const result = await sut.execute({
            questionId: "question-1",
            authorId: "author-2",
            title: "hello",
            content: "world"
        })

        expect(result.isLeft()).toBe(true)
        expect(inMemoryQuestionsRepository.items).toHaveLength(1)
    })
    
})