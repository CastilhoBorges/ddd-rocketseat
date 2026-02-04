import { expect, describe, it, beforeEach } from 'vitest';
import { DeleteAnswerUseCase } from './delete-answer.js';
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id.js';
import { InMemoryAnswerRepository } from '../../../../../test/repositories/in-memory-aswers-repository.js';
import { makeAnswer } from '../../../../../test/factories/make-answer.js';

let inMemoryAnswerRepository: InMemoryAnswerRepository;
let sut: DeleteAnswerUseCase;

describe('Delete Answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository();
    sut = new DeleteAnswerUseCase(inMemoryAnswerRepository);
  });

  it('should be albe to get a answer by slug', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-1'),
    );

    inMemoryAnswerRepository.create(newAnswer);

    await sut.execute({
      answerId: 'answer-1',
      authorId: 'author-1',
    });

    expect(inMemoryAnswerRepository.items).toHaveLength(0);
  });

  it('should not be able to delete a answer from another user', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-1'),
    );

    inMemoryAnswerRepository.create(newAnswer);

    expect(() => {
      return sut.execute({
        answerId: 'answer-1',
        authorId: 'author-2',
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
