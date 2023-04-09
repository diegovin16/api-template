import { expect, test } from 'vitest'
// TODO fix import alias for vitest and typescript
import { req, res } from '../utils/mock-req-res'
import Example from './example'

test('Call example Route', () => {
  const controller = new Example()
  controller.exampleRoute(req, res)
  expect(res.json).toBeCalledWith({
    example: true,
  })
})
