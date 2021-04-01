import React, { useState } from 'react'
import { Story } from '@storybook/react/types-6-0'

// Import component files
import ChannelRfiMessageDetail from './index'
import RFIPropTypes from './types/props'

import docs from './README.md'
import { GameMessagesMockRFI } from '@serge/mocks'
import { mostRecentOnly } from '@serge/helpers'
import { MessageCustom } from '@serge/custom-types'

const wrapper: React.FC = (storyFn: any) => <div style={{ height: '600px' }}>{storyFn()}</div>

export default {
  title: 'local/molecules/ChannRfilMessageDetail',
  component: ChannelRfiMessageDetail,
  decorators: [wrapper],
  parameters: {
    readme: {
      // Show readme before story
      content: docs
    },
    options: {
      // This story requires addons but other stories in this component do not
      showPanel: true
    }
  },
  argTypes: {
    isUmpire: {
      description: 'Player is from umpire force',
      control: 'boolean'
    },
    isRFIManager: {
      description: 'Player role has RFI Manager attribute',
      control: 'boolean'
    },
    role: {
      description: 'Player Role',
      control: {
        type: 'radio',
        options: [
          'Comms',
          'Logistics'
        ]
      }
    }
  }
}

const newest = mostRecentOnly(GameMessagesMockRFI)

const unallocated = newest[3] as MessageCustom
const inProgress = newest[4] as MessageCustom
const forReview = newest[5] as MessageCustom
const released = newest[6] as MessageCustom

const Template: Story<RFIPropTypes> = (args) => {
  const { isUmpire, role, message, isRFIManager } = args
  const [messageState, setMessageState] = useState<MessageCustom>(message)
  return (
    <ChannelRfiMessageDetail
      message={messageState}
      isRFIManager={isRFIManager}
      onChange={(nextMessage): void => setMessageState(nextMessage)}
      role={role}
      isUmpire={isUmpire}
    />
  )
}

export const Default = Template.bind({})
Default.args = {
  message: unallocated,
  isUmpire: true,
  isRFIManager: true,
  role: 'CO'
}

export const InProgress = Template.bind({})
InProgress.args = {
  message: inProgress,
  isRFIManager: true,
  isUmpire: true,
  role: 'CO 2'
}

export const ForReview = Template.bind({})
ForReview.args = {
  message: forReview,
  isRFIManager: true,
  isUmpire: true,
  role: 'CO 3'
}

export const Released = Template.bind({})
Released.args = {
  message: released,
  isRFIManager: true,
  isUmpire: true,
  role: 'CO 4'
}
