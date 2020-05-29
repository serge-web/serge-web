/* global it expect */

import React from 'react'
import { mount } from 'enzyme'

import Mapping from '../mapping'
import { Phase } from '@serge/config'

/* Import mock data */
import { platformTypes } from '@serge/mocks'

const bounds = {
  imageTop: 14.194809302,
  imageLeft: 42.3558566271,
  imageRight: 43.7417816271,
  imageBottom: 12.401259302
}

const LocalTileLayer = {
  url: '/tiles/{z}/{x}/{y}.png',
  attribution: 'Generated by QTiles'
}

const forces = [
  {
    color: '#FCFBEE',
    dirty: false,
    icon: 'default_img/umpireDefault.png',
    name: 'White',
    overview: 'Umpire force.',
    roles: [
      {
        control: true,
        isInsightViewer: true,
        isObserver: true,
        name: 'Game Control',
        password: 'p2311'
      }
    ],
    umpire: true,
    uniqid: 'umpire'
  },
  {
    assets: [
      {
        name: 'HMS DEVONSHIRE',
        contactId: 'C043',
        condition: 'Full capability',
        perceptions: {},
        platformType: 'frigate',
        position: 'S23',
        status: {
          state: 'Transiting',
          speedKts: 20
        },
        uniqid: 'a0pra00001'
      }
    ],
    color: '#00F',
    dirty: false,
    icon: 'default_img/umpireDefault.png',
    name: 'Blue',
    overview: 'Blue force.',
    roles: [
      {
        control: false,
        isInsightViewer: false,
        isObserver: false,
        name: 'CO',
        password: 'p5543'
      }
    ],
    umpire: false,
    uniqid: 'Blue'
  }
]

it('Mapping renders correctly with AssetIcon', () => {
  const div = document.createElement('div')
  document.body.appendChild(div)

  // Using enzyme's 'mount' to solve issues with Leaflet requiring access to the DOM and other features not
  // provided by react.render.
  const tree = mount(<Mapping
    tileDiameterMins = {5}
    bounds = {bounds}
    tileLayer = {LocalTileLayer}
    forces={forces}
    platforms = {platformTypes}
    playerForce="Blue"
    phase={Phase.Planning}
    turn={5}
  >
  </Mapping>, { attachTo: div })

  expect(tree).toMatchSnapshot()
})
