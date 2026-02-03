import type { AnswerRepository } from "../../src/domain/forum/application/repositories/answers-repository.js";
import type { Answer } from "../../src/domain/forum/enterprise/entities/answer.js";

export class InMemoryAnswerRepository implements AnswerRepository {
  public items: Answer[] = [];

  async create(answer: Answer): Promise<void> {
    this.items.push(answer);
  }
}
