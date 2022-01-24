import { add } from '../math'

describe('math.add', () => {
  it('sum two numbers', () => {
    expect(add(3, 4)).toEqual(7)
  })
})
