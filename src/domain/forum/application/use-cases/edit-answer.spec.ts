import { expect, describe, it } from "vitest"
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository"
import { EditAnswerUseCase } from "./edit-answer"
import { makeAnswer } from "test/factories/make-answer"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe("Edit Answer UseCase", () => {
    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository()
        sut = new EditAnswerUseCase(inMemoryAnswersRepository)
    })
    it("should be able to edit answer", async () => {
        const newAnswer = await makeAnswer({
            authorId: new UniqueEntityID("author-1")
        }, new UniqueEntityID("answer-1"))
        
        await inMemoryAnswersRepository.create(newAnswer)

        await sut.execute({
            answerId: "answer-1",
            authorId: "author-1",
            content: "world"
        })

        expect(inMemoryAnswersRepository.items[0]).toMatchObject({
            content: "world"
        })
    })
    it("should not be able to edit answer from a different author", async () => {
        const newAnswer = await makeAnswer({
            authorId: new UniqueEntityID("author-1")
        }, new UniqueEntityID("answer-1"))
        
        await inMemoryAnswersRepository.create(newAnswer)

        expect(sut.execute({
            answerId: "answer-1",
            authorId: "author-2",
            content: "world"
        })).rejects.toBeInstanceOf(Error)

        expect(inMemoryAnswersRepository.items).toHaveLength(1)
    })
    
})