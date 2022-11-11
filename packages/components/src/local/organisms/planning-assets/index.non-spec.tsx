/* global it expect */
import { forceColors, platformIcons } from '@serge/helpers'
import { P9Mock } from '@serge/mocks'
import { noop } from 'lodash'
import React from 'react'
import renderer from 'react-test-renderer'
import { PlanningAssets } from './index'

const forces = P9Mock.data.forces.forces
const blueForce = forces[1]

const forceCols = forceColors(forces)
const platformStyles = (P9Mock.data.platformTypes && platformIcons(P9Mock.data.platformTypes.platformTypes)) || []
const platformTypes = P9Mock.data.platformTypes ? P9Mock.data.platformTypes.platformTypes : []

jest.mock('leaflet', () => ({
  ...jest.requireActual('leaflet'),
  Symbol: {
    arrowHead: jest.fn()
  }
}))

jest.mock('react-leaflet-v4', () => ({
  useMap: (): jest.Mock => jest.fn()
}))

jest.mock('react-leaflet-geoman-v2', () => ({
  GeomanControls: (): React.ReactElement => <></>
}))

describe('Planning Assets component: ', () => {
  it('renders component correctly', () => {
    const tree = renderer
      .create(<PlanningAssets assets={[]} forceColors={forceCols} platformStyles={platformStyles} forces={forces} opFor={false}
        playerForce={blueForce} platformTypes={platformTypes} render={noop} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})