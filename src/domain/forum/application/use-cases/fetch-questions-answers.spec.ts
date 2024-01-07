import { expect, describe, it } from "vitest"
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository"
import { makeQuestion } from "test/factories/make-question"
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository"
import { FetchQuestionAnswersUseCase } from "./fetch-questions-answers"
import { makeAnswer } from "test/factories/make-answer"

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: FetchQuestionAnswersUseCase

describe("Fetch Answers Answers UseCase", () => {
    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository()
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
        sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository)
    })
    it("should be able to fetch recent answers", async () => {
        const newQuestion = await makeQuestion()

        await inMemoryQuestionsRepository.create(newQuestion)

        await inMemoryAnswersRepository.create(
            await makeAnswer({questionId: newQuestion.id})
        )

        await inMemoryAnswersRepository.create(
            await makeAnswer({questionId: newQuestion.id})
        )

        await inMemoryAnswersRepository.create(
            await makeAnswer({questionId: newQuestion.id})
        )

        const { answers } = await sut.execute({
            questionId: newQuestion.id.toString(),
            page : 1
        })

        expect(answers).toHaveLength(3)
        
        
    })

    it("should be able to get paginated question answers", async () => {
        const newQuestion = await makeQuestion()

        await inMemoryQuestionsRepository.create(newQuestion)

        for (let i = 1; i <= 25; i ++) {
            await inMemoryAnswersRepository.create(
                await makeAnswer({questionId: newQuestion.id})
            )
        }

        const fetchPageOne = await sut.execute({
            questionId: newQuestion.id.toString(),
            page : 1
        })
        const fetchPageTwo = await sut.execute({
            questionId: newQuestion.id.toString(),
            page: 2
        })

        expect(fetchPageOne.answers).toHaveLength(20)
        expect(fetchPageTwo.answers).toHaveLength(5)
    })
})