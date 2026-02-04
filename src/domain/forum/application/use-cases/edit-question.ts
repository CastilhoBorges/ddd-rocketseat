import type { QuestionRepository } from '../repositories/question-repository.js';

interface EditQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
  title?: string;
  content?: string;
}

interface EditQuestionUseCaseResponse {}

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
      throw new Error('Question not found');
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed');
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

    return {};
  }
}
