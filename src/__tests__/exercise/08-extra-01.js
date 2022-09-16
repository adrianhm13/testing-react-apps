// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {act, render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

test('exposes the count and increment/decrement functions', async () => {
  let result
  function TestComponent(props) {
    result = useCounter()
    return null
  }

  render(<TestComponent />)

  act(() => result.increment())
  expect(result.count).toBe(1)

  act(() => result.decrement())
  expect(result.count).toBe(0)

  act(() => result.decrement())
  expect(result.count).toBe(-1)
})

/* eslint no-unused-vars:0 */
