// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import { useCurrentPosition } from 'react-use-geolocation'
import Location from '../../examples/location'

jest.mock('react-use-geolocation')


test('displays the users current location', async () => {
  // 🐨 create a fakePosition object that has an object called "coords" with latitude and longitude
  const fakePosition = {
    coords: {latitude: 23, longitude: 75}
  }

  let setState
  function useMockCurrentPosition() {
    const state = React.useState([])
    setState  = state[1]
    return state[0]
  }

  useCurrentPosition.mockImplementation(useMockCurrentPosition)
  
  render(<Location />)
  
  expect(screen.queryByLabelText(/loading/i)).toBeInTheDocument()
  
  act(() => setState([fakePosition]))

  expect(screen.getByText(/latitude/i)).toHaveTextContent(fakePosition.coords.latitude)
  expect(screen.getByText(/longitude/i)).toHaveTextContent(fakePosition.coords.longitude)

})

/*
eslint
  no-unused-vars: "off",
*/
