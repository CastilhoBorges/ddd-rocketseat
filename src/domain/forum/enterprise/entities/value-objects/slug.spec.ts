import { expect, it } from 'vitest';
import { Slug } from './slug.js';
import { describe } from 'node:test';

describe('Slug Value Object', () => {
  it('it should be able to create a new slug from text', () => {
    const slug = Slug.createFromText('Example -- question_tudo ok por aqui');

    expect(slug).toEqual('example-question-tudo-ok-por-aqui');
  });
});
