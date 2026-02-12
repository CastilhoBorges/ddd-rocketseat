import type { UseCaseError } from '../../../../../core/errors/use-cases-error.js';

export class NotAllowedError extends Error implements UseCaseError {
  constructor() {
    super('Not allowerd');
  }
}
