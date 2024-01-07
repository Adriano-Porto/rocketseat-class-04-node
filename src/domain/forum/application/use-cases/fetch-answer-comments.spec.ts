import { expect, describe, it } from "vitest"
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository"
import { makeAnswer } from "test/factories/make-answer"
import { InMemoryAnswerCommentsRepository } from "test/repositories/in-memory-answers-comment"
import { FetchAnswerCommentsUseCase } from "./fetch-answer-comments"
import { makeAnswerComment } from "test/factories/make-answer-comment"

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswersCommentsRepository: InMemoryAnswerCommentsRepository
let sut: FetchAnswerCommentsUseCase

describe("Fetch Answers Answers UseCase", () => {
    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository()
        inMemoryAnswersCommentsRepository = new InMemoryAnswerCommentsRepository()
        sut = new FetchAnswerCommentsUseCase(inMemoryAnswersCommentsRepository)
    })
    it("should be able to fetch recent answers", async () => {
        const newAnswer = await makeAnswer()

        await inMemoryAnswersRepository.create(newAnswer)

        await inMemoryAnswersCommentsRepository.create(
            await makeAnswerComment({answerId: newAnswer.id})
        )

        await inMemoryAnswersCommentsRepository.create(
            await makeAnswerComment({answerId: newAnswer.id})
        )

        await inMemoryAnswersCommentsRepository.create(
            await makeAnswerComment({answerId: newAnswer.id})
        )

        const { answerComments } = await sut.execute({
            answerId: newAnswer.id.toString(),
            page : 1
        })

        expect(answerComments).toHaveLength(3)
    })

    it("should be able to get paginated question answers", async () => {
        const newAnswer = await makeAnswer()

        await inMemoryAnswersRepository.create(newAnswer)

        for (let i = 1; i <= 25; i ++) {
            await inMemoryAnswersCommentsRepository.create(
                await makeAnswerComment({answerId: newAnswer.id})
            )
        }

        const fetchPageOne = await sut.execute({
            answerId: newAnswer.id.toString(),
            page : 1
        })
        const fetchPageTwo = await sut.execute({
            answerId: newAnswer.id.toString(),
            page: 2
        })

        expect(fetchPageOne.answerComments).toHaveLength(20)
        expect(fetchPageTwo.answerComments).toHaveLength(5)
    })
})