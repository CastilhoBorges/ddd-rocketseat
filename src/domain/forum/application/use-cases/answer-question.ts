import { right, type Either } from '../../../../core/either.js';
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id.js';
import { Answer } from '../../enterprise/entities/answer.js';
import type { AnswerRepository } from '../repositories/answers-repository.js';

interface AnswerQuestionUseCaseRequest {
  instructorId: string;
  questionId: string;
  content: string;
}

type AnswerQuestionUseCaseResponse = Either<
  null,
  {
    answer: Answer;
  }
>;

export class AnswerQuestionUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityId(instructorId),
      questionId: new UniqueEntityId(questionId),
    });

    await this.answerRepository.create(answer);

    return right({
      answer,
    });
  }
}
