import { expect, describe, it } from "vitest"
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository"
import { CommentOnQuestionUseCase } from "./comment-on-question"
import { InMemoryQuestionCommentsRepository } from "test/repositories/in-memory-question-comments-repository"
import { makeQuestion } from "test/factories/make-question"

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: CommentOnQuestionUseCase

describe("Create Question", () => {
    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
        inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository()
        sut = new CommentOnQuestionUseCase(inMemoryQuestionsRepository, inMemoryQuestionCommentsRepository)
    })
    it("should be able to create question", async () => {
        const question = await makeQuestion()

        await inMemoryQuestionsRepository.create(question)

        await sut.execute({
            questionId: question.id.toString(),
            authorId: question.authorId.toString(),
            content: "lorem ipsum dolor it"
        })

        expect(inMemoryQuestionCommentsRepository.items[0].content).toEqual("lorem ipsum dolor it")
    })
})