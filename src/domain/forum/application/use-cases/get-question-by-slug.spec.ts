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

  it('should be albe to get a question by slug', async () => {
    const newQuestion = makeQuestion({ slug: Slug.create('new-question') });

    inMemoryQuestionRepository.create(newQuestion);

    const { question } = await sut.execute({
      slug: 'new-question',
    });

    expect(question.id).toBeTruthy();
    expect(question.title).toEqual(newQuestion.title);
  });
});
