// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'

test('submitting the form calls onSubmit with username and password', async () => {
  let submittedData

  const handleSubmit = data => {
    submittedData = data
  }

  render(<Login onSubmit={handleSubmit} />)

  const username = screen.getByLabelText(/username/i)
  const password = screen.getByLabelText(/password/i)

  await userEvent.type(username, 'Adrian Hervas')
  await userEvent.type(password, 'ThisIsAStrongPassword')

  const submitBtn = screen.getByRole('button', /submit/i)
  await userEvent.click(submitBtn)

  expect(submittedData).toEqual({
    username: 'Adrian Hervas',
    password: 'ThisIsAStrongPassword',
  })
})

/*
eslint
  no-unused-vars: "off",
*/
