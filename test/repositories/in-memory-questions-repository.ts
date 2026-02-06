import type { PaginationParams } from '../../src/core/repositories/pagination-params.js';
import type { QuestionRepository } from '../../src/domain/forum/application/repositories/question-repository.js';
import type { Question } from '../../src/domain/forum/enterprise/entities/question.js';

export class InMemoryQuestionRepository implements QuestionRepository {
  public items: Question[] = [];

  async findManyRecent({ page }: PaginationParams): Promise<Question[]> {
    const questions = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20);

    return questions;
  }

  async findById(id: string): Promise<Question | null> {
    const question = this.items.find((item) => item.id.toString() === id);

    if (!question) {
      return null;
    }

    return question;
  }

  async create(question: Question): Promise<void> {
    this.items.push(question);
  }

  async save(question: Question): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === question.id);

    this.items[itemIndex] = question;
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = this.items.find((item) => item.slug.value === slug);

    if (!question) {
      return null;
    }

    return question;
  }

  async delete(question: Question): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === question.id);

    this.items.splice(itemIndex, 1);
  }
}
