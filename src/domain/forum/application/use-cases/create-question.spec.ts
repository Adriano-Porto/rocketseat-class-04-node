import { expect, describe, it } from "vitest"
import { CreateQuestionUseCase } from "./create-question"
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository"

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

describe("Create Question", () => {
    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
        sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
    })
    it("should be able to create question", async () => {
        const result = await sut.execute({
            authorId: "1",
            content: "lorem ipsum",
            title: "lorem"
        })

        expect(result.isRight()).toBe(true)
        expect(inMemoryQuestionsRepository.items[0].id).toEqual(result.value?.question.id)
    })
})