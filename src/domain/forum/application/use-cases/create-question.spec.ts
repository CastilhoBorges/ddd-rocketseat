import { expect, describe, it, beforeEach } from 'vitest';
import { CreateQuestionUseCase } from './create-question.js';
import { InMemoryQuestionRepository } from '../../../../../test/repositories/in-memory-questions-repository.js';

let inMemoryQuestionRepository: InMemoryQuestionRepository;
let sut: CreateQuestionUseCase;

describe('Create Question Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository();
    sut = new CreateQuestionUseCase(inMemoryQuestionRepository);
  });

  it('should be create a Question', async () => {
    const { question } = await sut.execute({
      authorId: '1',
      title: 'New Question',
      content: 'Conteudo da pergunta',
    });

    expect(question.id).toBeTruthy();
  });
});
