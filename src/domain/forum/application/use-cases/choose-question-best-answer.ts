import type { Question } from '../../enterprise/entities/question.js';
import type { AnswerRepository } from '../repositories/answers-repository.js';
import type { QuestionRepository } from '../repositories/question-repository.js';

interface ChooeQuestionBestAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
}

interface ChooeQuestionBestAnswerUseCaseResponse {
  question: Question;
}

export class ChooeQuestionBestAnswerUseCase {
  constructor(
    private answerRepository: AnswerRepository,
    private questionRepository: QuestionRepository,
  ) {}

  async execute({
    answerId,
    authorId,
  }: ChooeQuestionBestAnswerUseCaseRequest): Promise<ChooeQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId);

    if (!answer) {
      throw new Error('Answer not found');
    }

    const question = await this.questionRepository.findById(
      answer.questionId.toString(),
    );

    if (!question) {
      throw new Error('Question not found');
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed');
    }

    question.bestAnswerId = answer.id;

    return { question };
  }
}
