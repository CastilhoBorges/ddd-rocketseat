import { expect, test } from 'vitest'
import { Slug } from './slug.js'

test('it should be able to create a new slug from text', () => {
  const slug = Slug.createFromText('Example -- question_tudo ok por aqui')

  expect(slug).toEqual('example-question-tudo-ok-por-aqui')
})
