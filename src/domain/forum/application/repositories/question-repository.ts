import type { Question } from '../../enterprise/entities/question.js';

export interface QuestionRepository {
  create(question: Question): Promise<void>;
  findBySlug(slug: string): Promise<Question | null>;
}
