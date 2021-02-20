import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { cleanup, render } from '@testing-library/react'

import MockDate from 'mockdate'
import App from '../App'
import { MemoryRouter, Route } from 'react-router-dom'

afterEach(() => {
  cleanup
  MockDate.reset()
})
describe ('Testing app',  () => {
  test('if no prams render default current month ',async () => {
    MockDate.set('2021-2-17') //Set current date to feb 17

    const  component1 =  render(
      <MemoryRouter>
        <App/>
      </MemoryRouter>
    )
    const cells1 =  component1.container.querySelectorAll('td > div')
    expect (cells1).toHaveLength(28)

    MockDate.set('2020-2-17') //Set current date to feb 17 is leap yearso shouldrwnder 29 days

    const  component2 =  render(
      <MemoryRouter>
        <App/>
      </MemoryRouter>
    )
    const cells2 =  component2.container.querySelectorAll('td > div')
    expect (cells2).toHaveLength(29)
  })


  test('if mock params provided then render default month from params ',async () => {
    MockDate.set('2021-2-17') //Set current date to feb 17
    const  component1 =  render(
      <MemoryRouter>
        <App/>
      </MemoryRouter>
    )
    const cells1 =  component1.container.querySelectorAll('td > div')
    expect (cells1).toHaveLength(28)

    const  component2 =  render(
      <MemoryRouter initialEntries= {['/mock/2020/2']}>
        <Route exact path={['/','/mock/:year/:month', '/mock/:year/:month/:day', '/*']} component={App} />
      </MemoryRouter>
    )
    const cells2 =  component2.container.querySelectorAll('td > div')
    expect (cells2).toHaveLength(29)
  })

  test('if mock params provided as full date then render currentdate as provided date  ',async () => {
    MockDate.set('2021-2-17') //Set current date to feb 17
    const  component1 =  render(
      <MemoryRouter>
        <App/>
      </MemoryRouter>
    )
    const cells1 =  component1.container.querySelectorAll('td > div')
    expect (cells1).toHaveLength(28)

    const  component2 =  render(
      <MemoryRouter initialEntries= {['/mock/2020/8/7']}>
        <Route exact path={['/','/mock/:year/:month', '/mock/:year/:month/:day', '/*']} component={App} />
      </MemoryRouter>
    )
    const cells2 =  component2.container.querySelectorAll('.dateCellToday')
    expect (cells2).toHaveLength(1)
    expect(cells2[0]).toHaveTextContent('7')
  })

})