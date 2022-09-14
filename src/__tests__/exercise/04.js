// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'
import faker from 'faker'

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

test('submitting the form calls onSubmit with username and password', async () => {
  const username = 'Adrian Hervas'
  const password = 'ThisIsAStrongPassword'

  const handleSubmit = jest.fn()

  render(<Login onSubmit={handleSubmit} />)

  const usernameField = screen.getByLabelText(/username/i)
  const passwordField = screen.getByLabelText(/password/i)

  await userEvent.type(usernameField, username)
  await userEvent.type(passwordField, password)

  const submitBtn = screen.getByRole('button', /submit/i)
  await userEvent.click(submitBtn)

  expect(handleSubmit).toHaveBeenCalledWith({
    username: username,
    password: password,
  })
  expect(handleSubmit).toBeCalledTimes(1)
})

function buildLoginForm(overrides) {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    ...overrides,
  }
}

test('submitting the form calls onSubmit with username and password', async () => {
  const {username, password} = buildLoginForm()

  const handleSubmit = jest.fn()

  render(<Login onSubmit={handleSubmit} />)

  const usernameField = screen.getByLabelText(/username/i)
  const passwordField = screen.getByLabelText(/password/i)

  await userEvent.type(usernameField, username)
  await userEvent.type(passwordField, password)

  const submitBtn = screen.getByRole('button', /submit/i)
  await userEvent.click(submitBtn)

  expect(handleSubmit).toHaveBeenCalledWith({
    username: username,
    password: password,
  })
  expect(handleSubmit).toBeCalledTimes(1)
})

/*
eslint
  no-unused-vars: "off",
*/
