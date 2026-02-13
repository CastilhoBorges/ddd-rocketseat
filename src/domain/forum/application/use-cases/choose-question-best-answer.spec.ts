import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryAnswerRepository } from '../../../../../test/repositories/in-memory-aswers-repository.js';
import { InMemoryQuestionRepository } from '../../../../../test/repositories/in-memory-questions-repository.js';
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer.js';
import { makeQuestion } from '../../../../../test/factories/make-question.js';
import { makeAnswer } from '../../../../../test/factories/make-answer.js';
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id.js';
import { ResourceNotFoundError } from './erros/resource-not-found.error.js';
import { NotAllowedError } from './erros/not-allowed-error.js';

let inMemoryAnswerRepository: InMemoryAnswerRepository;
let inMemoryQuestionRepository: InMemoryQuestionRepository;
let sut: ChooseQuestionBestAnswerUseCase;

describe('Choose Question Best Answer Use Case', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository();
    inMemoryQuestionRepository = new InMemoryQuestionRepository();
    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryAnswerRepository,
      inMemoryQuestionRepository,
    );
  });

  it('should be able to choose the best answer for a question', async () => {
    const question = makeQuestion(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('question-1'),
    );

    const answer = makeAnswer(
      {
        questionId: new UniqueEntityId('question-1'),
        authorId: new UniqueEntityId('author-2'),
      },
      new UniqueEntityId('answer-1'),
    );

    await inMemoryQuestionRepository.create(question);
    await inMemoryAnswerRepository.create(answer);

    const result = await sut.execute({
      answerId: 'answer-1',
      authorId: 'author-1',
    });

    expect(result.isRight()).toBe(true);
    expect(result.value?.question.bestAnswerId).toEqual(answer.id);
  });

  it('should not be able to choose a non-existing answer', async () => {
    const question = makeQuestion(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('question-1'),
    );

    await inMemoryQuestionRepository.create(question);

    const result = await sut.execute({
      answerId: 'answer-404',
      authorId: 'author-1',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });

  it('should not be able to choose best answer if question does not exist', async () => {
    const answer = makeAnswer(
      {
        questionId: new UniqueEntityId('question-404'),
        authorId: new UniqueEntityId('author-2'),
      },
      new UniqueEntityId('answer-1'),
    );

    await inMemoryAnswerRepository.create(answer);

    const result = await sut.execute({
      answerId: 'answer-1',
      authorId: 'author-1',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });

  it('should not be able to choose best answer from another user question', async () => {
    const question = makeQuestion(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('question-1'),
    );

    const answer = makeAnswer(
      {
        questionId: new UniqueEntityId('question-1'),
        authorId: new UniqueEntityId('author-2'),
      },
      new UniqueEntityId('answer-1'),
    );

    await inMemoryQuestionRepository.create(question);
    await inMemoryAnswerRepository.create(answer);

    const result = await sut.execute({
      answerId: 'answer-1',
      authorId: 'author-2',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
