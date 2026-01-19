import type { Answer } from '../entitites/answer.js';

export interface AnswerRepository {
  create(answer: Answer): Promise<void>;
}
