import { expect, describe, it, beforeEach, vi } from 'vitest';
import { InMemoryQuestionRepository } from '../../../../../test/repositories/in-memory-questions-repository.js';
import { makeQuestion } from '../../../../../test/factories/make-question.js';
import { EditQuestionUseCase } from './edit-question.js';
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id.js';

let inMemoryQuestionRepository: InMemoryQuestionRepository;
let sut: EditQuestionUseCase;

describe('Edit Question Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository();
    sut = new EditQuestionUseCase(inMemoryQuestionRepository);
  });

  it('should be able to edit title and content', async () => {
    const question = makeQuestion(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('question-1'),
    );

    await inMemoryQuestionRepository.create(question);

    await sut.execute({
      questionId: 'question-1',
      authorId: 'author-1',
      title: 'Novo título',
      content: 'Novo conteúdo',
    });

    expect(inMemoryQuestionRepository.items[0]).toMatchObject({
      title: 'Novo título',
      content: 'Novo conteúdo',
    });
  });

  it('should be able to edit only the title', async () => {
    const question = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
        content: 'Conteúdo original',
      },
      new UniqueEntityId('question-1'),
    );

    await inMemoryQuestionRepository.create(question);

    await sut.execute({
      questionId: 'question-1',
      authorId: 'author-1',
      title: 'Título atualizado',
    });

    expect(inMemoryQuestionRepository.items[0]).toMatchObject({
      title: 'Título atualizado',
      content: 'Conteúdo original',
    });
  });

  it('should be able to edit only the content', async () => {
    const question = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
        title: 'Título original',
      },
      new UniqueEntityId('question-1'),
    );

    await inMemoryQuestionRepository.create(question);

    await sut.execute({
      questionId: 'question-1',
      authorId: 'author-1',
      content: 'Conteúdo atualizado',
    });

    expect(inMemoryQuestionRepository.items[0]).toMatchObject({
      title: 'Título original',
      content: 'Conteúdo atualizado',
    });
  });

  it('should not be able to edit a non-existing question', async () => {
    await expect(
      sut.execute({
        questionId: 'question-404',
        authorId: 'author-1',
        title: 'Qualquer',
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to edit a question from another author', async () => {
    const question = makeQuestion(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('question-1'),
    );

    await inMemoryQuestionRepository.create(question);

    await expect(
      sut.execute({
        questionId: 'question-1',
        authorId: 'author-2',
        title: 'Tentativa inválida',
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('should not save if no fields are provided', async () => {
    const question = makeQuestion(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('question-1'),
    );

    const saveSpy = vi.spyOn(inMemoryQuestionRepository, 'save');

    await inMemoryQuestionRepository.create(question);

    await sut.execute({
      questionId: 'question-1',
      authorId: 'author-1',
    });

    expect(saveSpy).not.toHaveBeenCalled();
  });
});
