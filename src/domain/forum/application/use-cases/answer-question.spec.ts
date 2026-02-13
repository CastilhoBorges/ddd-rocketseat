import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryAnswerRepository } from '../../../../../test/repositories/in-memory-aswers-repository.js';
import { AnswerQuestionUseCase } from './answer-question.js';

let inMemoryAnswerRepository: InMemoryAnswerRepository;
let sut: AnswerQuestionUseCase;

describe('Answer Question Use Case', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository();
    sut = new AnswerQuestionUseCase(inMemoryAnswerRepository);
  });

  it('should be create an Answer', async () => {
    const result = await sut.execute({
      content: 'Answer Response',
      instructorId: '1',
      questionId: '2',
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryAnswerRepository.items[0]).toEqual(result.value?.answer);
  });
});
