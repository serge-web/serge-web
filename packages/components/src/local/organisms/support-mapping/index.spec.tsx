import { mount } from 'enzyme'
import React from 'react'
import SupportMapping from './index'
import { noop } from 'lodash'

describe('Support Mapping component: ', () => {
  it('renders component correctly', () => {
    const tree = mount(<SupportMapping forces={[]} filterApplied={true} setFilterApplied={noop}
      position={[51.505, -0.09]} zoom={12} opAssets={[]} ownAssets={[]} setSelectedItems={noop} selectedItems={[]} />)
    expect(tree).toMatchSnapshot()
  })
})
