import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryQuestionRepository } from '../../../../../test/repositories/in-memory-questions-repository.js';
import { makeQuestion } from '../../../../../test/factories/make-question.js';
import { DeleteQuestionUseCase } from './delete-question.js';
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id.js';
import { NotAllowedError } from './erros/not-allowed-error.js';
import { ResourceNotFoundError } from './erros/resource-not-found.error.js';

let inMemoryQuestionRepository: InMemoryQuestionRepository;
let sut: DeleteQuestionUseCase;

describe('Delete Question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository();
    sut = new DeleteQuestionUseCase(inMemoryQuestionRepository);
  });

  it('should be able to delete a question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    );

    await inMemoryQuestionRepository.create(newQuestion);

    const result = await sut.execute({
      questionId: 'question-1',
      authorId: 'author-1',
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryQuestionRepository.items).toHaveLength(0);
  });

  it('should not be able to delete a non-existing question', async () => {
    const result = await sut.execute({
      questionId: 'non-existing',
      authorId: 'author-1',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });

  it('should not be able to delete a question from another user', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    );

    await inMemoryQuestionRepository.create(newQuestion);

    const result = await sut.execute({
      questionId: 'question-1',
      authorId: 'author-2',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
