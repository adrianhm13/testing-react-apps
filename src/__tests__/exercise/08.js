// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

// 🐨 create a simple function component that uses the useCounter hook
// and then exposes some UI that our test can interact with to test the
// capabilities of this hook
function TestComponent() {
  const {count, increment, decrement} = useCounter()
  return (
    <div>
      <button onClick={increment}>Increment</button>
      <span>Result: {count}</span>
      <button onClick={decrement}>Decrement</button>
    </div>
  )
}
// 💰 here's how to use the hook:
// const {count, increment, decrement} = useCounter()

test('exposes the count and increment/decrement functions', async () => {
  // 🐨 render the component
  render(<TestComponent />)
  // 🐨 get the elements you need using screen
  const increment = screen.getByRole('button', {name: /increment/i})
  const decrement = screen.getByRole('button', {name: /decrement/i})
  const count = screen.getByText(/result:/i)
  // 🐨 assert on the initial state of the hook
  expect(count).toHaveTextContent('Result: 0')
  // 🐨 interact with the UI using userEvent and assert on the changes in the UI

  await userEvent.click(increment)
  expect(count).toHaveTextContent('Result: 1')

  await userEvent.click(decrement)
  expect(count).toHaveTextContent('Result: 0')

  await userEvent.click(decrement)
  expect(count).toHaveTextContent('Result: -1')
})

/* eslint no-unused-vars:0 */
