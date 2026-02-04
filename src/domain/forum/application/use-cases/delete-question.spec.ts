import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryQuestionRepository } from '../../../../../test/repositories/in-memory-questions-repository.js';
import { makeQuestion } from '../../../../../test/factories/make-question.js';
import { DeleteQuestionUseCase } from './delete-question.js';
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id.js';

let inMemoryQuestionRepository: InMemoryQuestionRepository;
let sut: DeleteQuestionUseCase;

describe('Delete Question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository();
    sut = new DeleteQuestionUseCase(inMemoryQuestionRepository);
  });

  it('should be albe to get a question by slug', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    );

    inMemoryQuestionRepository.create(newQuestion);

    await sut.execute({
      questionId: 'question-1',
      authorId: 'author-1',
    });

    expect(inMemoryQuestionRepository.items).toHaveLength(0);
  });

  it('should not be able to delete a question from another user', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    );

    inMemoryQuestionRepository.create(newQuestion);

    expect(() => {
      return sut.execute({
        questionId: 'question-1',
        authorId: 'author-2',
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
