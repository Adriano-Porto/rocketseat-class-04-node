import { expect, describe, it } from "vitest"
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { DeleteAnswerUseCase } from "./delete-answer-question"
import { makeAnswer } from "test/factories/make-answer"

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase

describe("Delete Answer UseCase", () => {
    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository()
        sut = new DeleteAnswerUseCase(inMemoryAnswersRepository)
    })
    it("should be able to delete answer", async () => {
        const newAnswer = await makeAnswer({
            authorId: new UniqueEntityID("author-1")
        }, new UniqueEntityID("answer-1"))
        
        await inMemoryAnswersRepository.create(newAnswer)

        await sut.execute({
            answerId: "answer-1",
            authorId: "author-1"
        })

        expect(inMemoryAnswersRepository.items).toHaveLength(0)
    })
    it("should not be able to delete answer from a different author", async () => {
        const newAnswer = await makeAnswer({
            authorId: new UniqueEntityID("author-1")
        }, new UniqueEntityID("answer-1"))
        
        await inMemoryAnswersRepository.create(newAnswer)

        expect(sut.execute({
            answerId: "answer-1",
            authorId: "author-2"
        })).rejects.toBeInstanceOf(Error)

        expect(inMemoryAnswersRepository.items).toHaveLength(1)
    })
    
})