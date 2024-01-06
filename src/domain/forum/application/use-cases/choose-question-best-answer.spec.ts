import { expect, describe, it } from "vitest"
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository"
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository"
import { ChooseQuestionBestAnswerUseCase } from "./choose-question-best-answer"
import { makeAnswer } from "test/factories/make-answer"
import { makeQuestion } from "test/factories/make-question"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: ChooseQuestionBestAnswerUseCase

describe("Choose Question best answer", () => {
    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
        inMemoryAnswersRepository = new InMemoryAnswersRepository()
        sut = new ChooseQuestionBestAnswerUseCase(inMemoryQuestionsRepository, inMemoryAnswersRepository)
    })
    it("should be able to choose question best answer", async () => {
        const newQuestion = await makeQuestion()

        await inMemoryQuestionsRepository.create(newQuestion)

        const answer = await makeAnswer({
            questionId: newQuestion.id
        })

        await inMemoryAnswersRepository.create(answer)
        
        await sut.execute({
            authorId: newQuestion.authorId.toString(),
            answerId: answer.id.toString(),
        })
        expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toEqual(answer.id)
    })

    it("should not be able to choose best answer for a question with different author", async () => {
        const newQuestion = await makeQuestion({
            authorId: new UniqueEntityID("author-1")
        })
        const answer = await makeAnswer({
            questionId: newQuestion.id
        })

        await inMemoryAnswersRepository.create(answer)
        
        expect(sut.execute({
            authorId: "author-2",
            answerId: newQuestion.id.toString()
        })).rejects.toBeInstanceOf(Error)
    })
})