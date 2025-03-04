import React, { useState } from 'react'
import { StoryFC } from 'src/custom-types'

// Import component files
import EditableList from './index'
import docs from './README.md'

// import types
import { Item } from './types/props'

const wrapper: React.FC = (storyFn: any) => <div style={{ height: '600px' }}>{storyFn()}</div>

export default {
  title: 'local/molecules/EditableList',
  component: EditableList,
  decorators: [wrapper],
  parameters: {
    readme: {
      // Show readme before story
      content: docs
    }
  }
}

export const Default: StoryFC = () => {
  const [items, setItems] = useState<Array<Item>>([{ name: 'list item 1' }, { name: 'list item 2' }])

  const handleClick = (item: Item): void => {
    console.log('selected item:', item)
  }
  const handleCreate = (): void => {
    setItems([
      {
        name: 'New Item',
        conditions: [],
        icon: '',
        speedKts: [],
        states: [],
        travelMode: 'sea',
        uniqid: 'a1'
      },
      ...items
    ])
  }
  return (
    <EditableList
      title="Add a New Force"
      items={items}
      onClick={handleClick}
      onCreate={handleCreate}
      searchLabel="Search Force"
    />
  )
}

Default.story = {
  parameters: {
    options: {
      // This story requires addons but other stories in this component do not
      showPanel: true
    }
  }
}
