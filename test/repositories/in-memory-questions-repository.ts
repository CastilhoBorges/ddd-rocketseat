import type { QuestionRepository } from '../../src/domain/forum/application/repositories/question-repository.js';
import type { Question } from '../../src/domain/forum/enterprise/entities/question.js';

export class InMemoryQuestionRepository implements QuestionRepository {
  public items: Question[] = [];

  async create(question: Question): Promise<void> {
    this.items.push(question);
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = this.items.find((item) => item.slug.value === slug);

    if (!question) {
      return null;
    }

    return question;
  }
}
