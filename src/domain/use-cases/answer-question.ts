import { Answer } from '../entitites/answer.js';
import type { AnswerRepository } from '../repositories/answers-repository.js';

interface AnswerQuestionUseCaseRequest {
  instructorId: string;
  questionId: string;
  content: string;
}

export class AnswerQuestionUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({ instructorId, questionId, content }: AnswerQuestionUseCaseRequest) {
    const answer = new Answer({ content, authorId: instructorId, questionId });

    await this.answerRepository.create(answer)

    return answer;
  }
}
