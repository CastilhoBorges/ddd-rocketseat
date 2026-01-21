import { Entity } from '../../core/entities/entity.js';
import type { UniqueEntityId } from '../../core/entities/unique-entity-id.js';

interface StudentProps {
  name: string;
}

export class Student extends Entity<StudentProps> {
  static create(props: StudentProps, id?: UniqueEntityId) {
    const question = new Student(
      {
        ...props,
      },
      id
    );

    return question;
  }
}
