/* global it expect */

import React from 'react'
import renderer from 'react-test-renderer'

import MessageCreator from './index'

const force = {
  name: 'blue',
  color: '#6699cc',
  icon: ''
}

const createNodeMock = (el: any): HTMLTextAreaElement | null => {
  if (el.type === 'textarea') {
    return document.createElement('textarea')
  }
  return null
}

describe('MessageCreator component:', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MessageCreator from={force} channel={'Game Admin'} roleName={'Umpire'} roleId={'r12345'} />,
        { createNodeMock }
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
