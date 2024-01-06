import { expect, describe, it } from "vitest"
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository"
import { makeQuestion } from "test/factories/make-question"
import { FetchRecentQuestionsUseCase } from "./fetch-recent-questions"

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: FetchRecentQuestionsUseCase

describe("Fetch Recent Questions UseCase", () => {
    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
        sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository)
    })
    it("should be able to fetch recent questions", async () => {

        await inMemoryQuestionsRepository.create(
            await makeQuestion({createdAt: new Date(2022, 0, 20)})
        )
        await inMemoryQuestionsRepository.create(
            await makeQuestion({createdAt: new Date(2022, 0, 21)})
        )
        await inMemoryQuestionsRepository.create(
            await makeQuestion({createdAt: new Date(2022, 0, 22)})
        )

        const { questions } = await sut.execute({page : 1})

        expect(questions).toHaveLength(3)
        expect(questions[0]).toEqual(expect.objectContaining({
            createdAt: new Date(2022, 0, 22)
        }))
        
    })

    it("should be able to get paginated recent question", async () => {

        for (let i = 1; i <= 25; i ++) {
            await inMemoryQuestionsRepository.create(
                await makeQuestion({createdAt: new Date(2022, 0, i)})
            )
        }

        const fetchPageOne = await sut.execute({page : 1})
        const fetchPageTwo = await sut.execute({page: 2})

        expect(fetchPageOne.questions).toHaveLength(20)
        expect(fetchPageOne.questions[0]).toEqual(expect.objectContaining({
            createdAt: new Date(2022, 0, 25)
        }))
        expect(fetchPageTwo.questions).toHaveLength(5)
        expect(fetchPageTwo.questions[4]).toEqual(expect.objectContaining({
            createdAt: new Date(2022, 0, 1)
        }))
        
    })
})