import { expect, describe, it } from "vitest"
import { AnswerQuestionUseCase } from "./answer-question"
import { AnswersRespository } from "@/domain/forum/application/respositories/answers-repository"
import { Answer } from "../../enterprise/entities/answer"

const answersRepository: AnswersRespository = {
    create: async (answer: Answer) => {
        return 
    }
}

describe("Answer Question", () => {
    it("should be able to answer question", async () => {
        const answerQuestion = new AnswerQuestionUseCase(answersRepository)

        const answer = await answerQuestion.execute({
            questionId: "1",
            instructorId: "1",
            content: "new Answer",
        })

        expect(answer.content).toEqual("new Answer")
    })
})