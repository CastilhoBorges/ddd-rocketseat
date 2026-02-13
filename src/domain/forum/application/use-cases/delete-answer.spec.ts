import { expect, describe, it, beforeEach } from 'vitest';
import { DeleteAnswerUseCase } from './delete-answer.js';
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id.js';
import { InMemoryAnswerRepository } from '../../../../../test/repositories/in-memory-aswers-repository.js';
import { makeAnswer } from '../../../../../test/factories/make-answer.js';
import { NotAllowedError } from './erros/not-allowed-error.js';
import { ResourceNotFoundError } from './erros/resource-not-found.error.js';

let inMemoryAnswerRepository: InMemoryAnswerRepository;
let sut: DeleteAnswerUseCase;

describe('Delete Answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository();
    sut = new DeleteAnswerUseCase(inMemoryAnswerRepository);
  });

  it('should be able to delete an answer', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-1'),
    );

    await inMemoryAnswerRepository.create(newAnswer);

    const result = await sut.execute({
      answerId: 'answer-1',
      authorId: 'author-1',
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryAnswerRepository.items).toHaveLength(0);
  });

  it('should not be able to delete a non-existing answer', async () => {
    const result = await sut.execute({
      answerId: 'non-existing',
      authorId: 'author-1',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });

  it('should not be able to delete a answer from another user', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-1'),
    );

    await inMemoryAnswerRepository.create(newAnswer);

    const result = await sut.execute({
      answerId: 'answer-1',
      authorId: 'author-2',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
