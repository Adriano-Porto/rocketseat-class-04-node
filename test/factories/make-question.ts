import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Question, QuestionProps } from "@/domain/forum/enterprise/entities/question"
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug"

export async function makeQuestion(override: Partial<QuestionProps> = {}) {
    const question = await Question.create({
        authorId: new UniqueEntityID(),
        content: "lorem ipsum",
        title: "example question",
        slug: Slug.create("example-question"),
        ...override
    })

    return question
}