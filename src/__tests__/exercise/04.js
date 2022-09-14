// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'

test('submitting the form calls onSubmit with username and password', async () => {
  const username = 'Adrian Hervas'
  const password = 'ThisIsAStrongPassword'

  let submittedData

  const handleSubmit = data => {
    submittedData = data
  }

  render(<Login onSubmit={handleSubmit} />)

  const usernameField = screen.getByLabelText(/username/i)
  const passwordField = screen.getByLabelText(/password/i)

  await userEvent.type(usernameField, username)
  await userEvent.type(passwordField, password)

  const submitBtn = screen.getByRole('button', /submit/i)
  await userEvent.click(submitBtn)

  expect(submittedData).toEqual({
    username: username,
    password: password,
  })
})

/*
eslint
  no-unused-vars: "off",
*/
