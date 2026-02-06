import type { Question } from '../../enterprise/entities/question.js';
import type { QuestionRepository } from '../repositories/question-repository.js';

interface FetchRecentQuestionUseCaseRequest {
  page: number;
}

interface FetchRecentQuestionUseCaseResponse {
  questions: Question[];
}

export class FetchRecentQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    page,
  }: FetchRecentQuestionUseCaseRequest): Promise<FetchRecentQuestionUseCaseResponse> {
    const questions = await this.questionRepository.findManyRecent({ page });

    if (!questions) {
      throw new Error('Question not found');
    }

    return {
      questions,
    };
  }
}
