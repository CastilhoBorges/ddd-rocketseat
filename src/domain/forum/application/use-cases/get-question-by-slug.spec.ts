import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryQuestionRepository } from '../../../../../test/repositories/in-memory-questions-repository.js';
import { GetQuestionUseCase } from './get-question-by-slug.js';
import { makeQuestion } from '../../../../../test/factories/make-question.js';
import { Slug } from '../../enterprise/entities/value-objects/slug.js';

let inMemoryQuestionRepository: InMemoryQuestionRepository;
let sut: GetQuestionUseCase;

describe('Get Question by slug Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository();
    sut = new GetQuestionUseCase(inMemoryQuestionRepository);
  });

  it('should be able to get a question by slug', async () => {
    const newQuestion = makeQuestion({ slug: Slug.create('new-question') });

    await inMemoryQuestionRepository.create(newQuestion);

    const result = await sut.execute({
      slug: 'new-question',
    });

    expect(result.isRight()).toBe(true);
    expect(result.value?.question.id).toBeTruthy();
    expect(result.value?.question.title).toEqual(newQuestion.title);
  });
});
