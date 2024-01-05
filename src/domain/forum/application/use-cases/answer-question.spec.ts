import { expect, describe, it } from "vitest"
import { AnswerQuestionUseCase } from "./answer-question"
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository"

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase
describe("Answer Question", () => {
    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository()
        sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
    })
    it("should be able to answer question", async () => {
        const {answer} = await sut.execute({
            questionId: "1",
            instructorId: "1",
            content: "new Answer",
        })

        expect(answer.content).toEqual("new Answer")
        expect(inMemoryAnswersRepository.items[0].id).toEqual(answer.id)
    })
})