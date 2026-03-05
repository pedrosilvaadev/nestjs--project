import { Slug } from './slug'

test('it should be able to create a slug', () => {
  const slug = Slug.createFromText('Exemplo de slug')

  expect(slug.value).toEqual('exemplo-de-slug')
})
