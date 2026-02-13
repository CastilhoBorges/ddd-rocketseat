import { left, right, type Either } from '../../../../core/either.js';
import type { AnswerRepository } from '../repositories/answers-repository.js';
import { NotAllowedError } from './erros/not-allowed-error.js';
import { ResourceNotFoundError } from './erros/resource-not-found.error.js';

interface DeleteAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
}

type DeleteAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>;

export class DeleteAnswerUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    answerId,
    authorId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId);

    if (!answer) {
      return left(new ResourceNotFoundError());
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError());
    }

    await this.answerRepository.delete(answer);

    return right({});
  }
}
