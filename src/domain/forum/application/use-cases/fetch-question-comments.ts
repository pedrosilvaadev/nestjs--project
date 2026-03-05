import { Either, right } from '@/core/either'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionsCommentsRepository } from '../repositories/questions-comments-repository'

interface FetchQuestionsCommentsUseCaseRequest {
  questionId: string
  page: number
}

type FetchQuestionsCommentsUseCaseResponse = Either<
  null,
  { questionComments: QuestionComment[] }
>

export class FetchQuestionsCommentsUseCase {
  constructor(
    private questionCommentsRepository: QuestionsCommentsRepository,
  ) {}

  async execute({
    page,
    questionId,
  }: FetchQuestionsCommentsUseCaseRequest): Promise<FetchQuestionsCommentsUseCaseResponse> {
    const questionComments =
      await this.questionCommentsRepository.findManyByQuestionId(questionId, {
        page,
      })

    return right({ questionComments })
  }
}
