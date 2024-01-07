import { expect, describe, it } from "vitest"
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository"
import { CommentOnAnswerUseCase } from "./comment-on-answer"
import { makeAnswer } from "test/factories/make-answer"
import { InMemoryAnswerCommentsRepository } from "test/repositories/in-memory-answers-comment"

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: CommentOnAnswerUseCase

describe("Create Answer", () => {
    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository()
        inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
        sut = new CommentOnAnswerUseCase(inMemoryAnswersRepository, inMemoryAnswerCommentsRepository)
    })
    it("should be able to create answer", async () => {
        const answer = await makeAnswer()

        await inMemoryAnswersRepository.create(answer)

        await sut.execute({
            answerId: answer.id.toString(),
            authorId: answer.authorId.toString(),
            content: "lorem ipsum dolor it"
        })

        expect(inMemoryAnswerCommentsRepository.items[0].content).toEqual("lorem ipsum dolor it")
    })
})