import { UniqueEntityId } from '../../../../core/entities/unique-entity-id.js';
import { Answer } from '../../enterprise/entities/answer.js';
import { Question } from '../../enterprise/entities/question.js';
import type { QuestionRepository } from '../repositories/question-repository.js';

interface CreateQuestionUseCaseRequest {
  authorId: string;
  title: string;
  content: string;
}

interface CreateQuestionUseCaseResponse {
  question: Question;
}

export class CreateQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    authorId,
    content,
    title,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityId(authorId),
      title,
      content,
    });

    await this.questionRepository.create(question);

    return {
      question,
    };
  }
}
