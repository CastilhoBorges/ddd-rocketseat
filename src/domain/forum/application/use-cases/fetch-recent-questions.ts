import { left, right, type Either } from '../../../../core/either.js';
import type { Question } from '../../enterprise/entities/question.js';
import type { QuestionRepository } from '../repositories/question-repository.js';
import { ResourceNotFoundError } from './erros/resource-not-found.error.js';

interface FetchRecentQuestionUseCaseRequest {
  page: number;
}

type FetchRecentQuestionUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    questions: Question[];
  }
>;

export class FetchRecentQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    page,
  }: FetchRecentQuestionUseCaseRequest): Promise<FetchRecentQuestionUseCaseResponse> {
    const questions = await this.questionRepository.findManyRecent({ page });

    if (!questions) {
      return left(new ResourceNotFoundError());
    }

    return right({
      questions,
    });
  }
}
