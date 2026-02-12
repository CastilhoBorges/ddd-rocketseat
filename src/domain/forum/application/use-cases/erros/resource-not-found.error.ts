import type { UseCaseError } from '../../../../../core/errors/use-cases-error.js';

export class ResourceNotFoundError extends Error implements UseCaseError {
  constructor() {
    super('Resource Not Found');
  }
}
