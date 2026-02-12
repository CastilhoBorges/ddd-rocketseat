import { left, right, type Either } from '../../../../core/either.js';
import type { Question } from '../../enterprise/entities/question.js';
import type { AnswerRepository } from '../repositories/answers-repository.js';
import type { QuestionRepository } from '../repositories/question-repository.js';
import { NotAllowedError } from './erros/not-allowed-error.js';
import { ResourceNotFoundError } from './erros/resource-not-found.error.js';

interface ChooeQuestionBestAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
}

type ChooeQuestionBestAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question;
  }
>;

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
      throw left(new ResourceNotFoundError());
    }

    const question = await this.questionRepository.findById(
      answer.questionId.toString(),
    );

    if (!question) {
      throw left(new ResourceNotFoundError());
    }

    if (authorId !== question.authorId.toString()) {
      throw left(new NotAllowedError());
    }

    question.bestAnswerId = answer.id;

    return right({ question });
  }
}
