import { DomainEvents } from '@/core/events/domain-events'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Question } from '../question'

export class QuestionBestAnswerChosenEvent implements DomainEvents {
  public ocurredAt: Date
  public question: Question
  public bestAnswerId: UniqueEntityID

  constructor(question: Question, bestAnswerId: UniqueEntityID) {
    this.ocurredAt = new Date()
    this.question = question
    this.bestAnswerId = bestAnswerId
  }

  getAggregateId(): UniqueEntityID {
    return this.question.id
  }
}
