import { DomainEvents } from '@/core/events/domain-events'
import { Answer } from '../answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export class AnswerCreatedEvent implements DomainEvents {
  public ocurredAt: Date
  public answer: Answer
  constructor(answer: Answer) {
    this.ocurredAt = new Date()
    this.answer = answer
  }

  getAggregateId(): UniqueEntityID {
    return this.answer.id
  }
}
