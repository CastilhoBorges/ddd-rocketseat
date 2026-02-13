import { left, right, type Either } from '../../../../core/either.js';
import type { QuestionRepository } from '../repositories/question-repository.js';
import { NotAllowedError } from './erros/not-allowed-error.js';
import { ResourceNotFoundError } from './erros/resource-not-found.error.js';

interface EditQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
  title?: string;
  content?: string;
}

type EditQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>;

export class EditQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    authorId,
    questionId,
    title,
    content,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId);

    if (!question) {
      return left(new ResourceNotFoundError());
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError());
    }

    let hasChanges = false;

    if (title !== undefined) {
      question.title = title;
      hasChanges = true;
    }

    if (content !== undefined) {
      question.content = content;
      hasChanges = true;
    }

    if (hasChanges) {
      await this.questionRepository.save(question);
    }

    return right({});
  }
}
