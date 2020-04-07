/* global it expect */

import React from 'react'
import renderer from 'react-test-renderer'

import AssetIcon from './index'

it('AssetIcon renders correctly', () => {
  const tree = renderer
    .create(<AssetIcon position={[14.194809302, 42.3558566271]} icon="icon-name" force="blue" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});