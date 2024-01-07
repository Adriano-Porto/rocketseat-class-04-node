import { expect, describe, it } from "vitest"
import { DeleteAnswerCommentUseCase } from "./delete-answer-comment"
import { makeAnswerComment } from "test/factories/make-answer-comment"
import { InMemoryAnswerCommentsRepository } from "test/repositories/in-memory-answers-comment"

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: DeleteAnswerCommentUseCase

describe("Delete Answer Comment", () => {
    beforeEach(() => {
        inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
        sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository)
    })
    it("should be able to delete answer comment", async () => {
        const answerComment = await makeAnswerComment()

        await inMemoryAnswerCommentsRepository.create(answerComment)

        await sut.execute({
            answerCommentId: answerComment.id.toString(),
            authorId: answerComment.authorId.toString(),
        })

        expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0)
    })

    it("should not be able to delete another author answer comment", async () => {
        const answerComment = await makeAnswerComment()

        await inMemoryAnswerCommentsRepository.create(answerComment)

        

        expect(sut.execute({
            answerCommentId: answerComment.id.toString(),
            authorId: "author-2",
        })).rejects.toBeInstanceOf(Error)
    })
})