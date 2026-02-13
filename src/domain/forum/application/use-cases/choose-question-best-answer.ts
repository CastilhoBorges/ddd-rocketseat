import { left, right, type Either } from '../../../../core/either.js';
import type { Question } from '../../enterprise/entities/question.js';
import type { AnswerRepository } from '../repositories/answers-repository.js';
import type { QuestionRepository } from '../repositories/question-repository.js';
import { NotAllowedError } from './erros/not-allowed-error.js';
import { ResourceNotFoundError } from './erros/resource-not-found.error.js';

interface ChooseQuestionBestAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
}

type ChooseQuestionBestAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question;
  }
>;

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private answerRepository: AnswerRepository,
    private questionRepository: QuestionRepository,
  ) {}

  async execute({
    answerId,
    authorId,
  }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId);

    if (!answer) {
      return left(new ResourceNotFoundError());
    }

    const question = await this.questionRepository.findById(
      answer.questionId.toString(),
    );

    if (!question) {
      return left(new ResourceNotFoundError());
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError());
    }

    question.bestAnswerId = answer.id;

    return right({ question });
  }
}
