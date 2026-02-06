import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryQuestionRepository } from '../../../../../test/repositories/in-memory-questions-repository.js';
import { FetchRecentQuestionUseCase } from './fetch-recent-questions.js';
import { makeQuestion } from '../../../../../test/factories/make-question.js';

let inMemoryQuestionRepository: InMemoryQuestionRepository;
let sut: FetchRecentQuestionUseCase;

describe('Fetch Recent Questions Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository();
    sut = new FetchRecentQuestionUseCase(inMemoryQuestionRepository);
  });

  it('should be able to fetch recent questions', async () => {
    const question1 = makeQuestion({ createdAt: new Date(2022, 0, 20) });
    const question2 = makeQuestion({ createdAt: new Date(2022, 0, 18) });
    const question3 = makeQuestion({ createdAt: new Date(2022, 0, 23) });

    await inMemoryQuestionRepository.create(question1);
    await inMemoryQuestionRepository.create(question2);
    await inMemoryQuestionRepository.create(question3);

    const { questions } = await sut.execute({
      page: 1,
    });

    expect(questions).toHaveLength(3);
    expect(questions).toEqual([question3, question1, question2]);
  });

  it('should be able to fetch paginated recent questions', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionRepository.create(makeQuestion());
    }

    const { questions } = await sut.execute({
      page: 2,
    });

    expect(questions).toHaveLength(2);
  });
});