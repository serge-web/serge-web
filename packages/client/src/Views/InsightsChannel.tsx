import { MessageFeedback } from '@serge/custom-types'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateFeedbackMessages } from '../ActionsAndReducers/playerUi/playerUi_ActionCreators'
import { expiredStorage, LOCAL_STORAGE_TIMEOUT } from '../consts'
import { usePlayerUiDispatch, usePlayerUiState } from '../Store/PlayerUi'
import MessagesListInsightsChannel from './MessagesListInsightsChannel'
import MessagesListRenderProp from './MessagesListRenderProp'

const InsightsChannel = (): React.ReactElement => {
  const dispatch = useDispatch()
  const [allMarkedRead, setAllMarkedRead] = useState(false)
  const {currentWargame, feedbackMessages, wargameTitle, selectedForce, selectedRole} = usePlayerUiState()

  useEffect(() => {
    let title = 'Serge'
    const feedbackUnreadMsgCount = feedbackMessages.filter(message => !message.hasBeenRead).length
    if (feedbackUnreadMsgCount) {
      title += ` (${feedbackUnreadMsgCount})`
    }
    document.title = title
  }, [feedbackMessages])

  const markAllAsRead = (): void => {
    const unreadMessageList: MessageFeedback[] = []
    feedbackMessages.forEach((message) => {
      expiredStorage.setItem(currentWargame + message._id, 'read', LOCAL_STORAGE_TIMEOUT)
      if (!message.hasBeenRead) {
        message.hasBeenRead = true
        unreadMessageList.push(message)
      }
    })
    // update feedback message read status
    if (unreadMessageList.length) {
      dispatch(updateFeedbackMessages(currentWargame, unreadMessageList))
    }
    setAllMarkedRead(true)
  }

  // TODO: maybe some other check here bcos it's already defined as false
  // componentDidMount() {
  //   const [ state ] = this.context;
  //   let channelLength = Object.keys(state.feedbackMessages).length;
  //
  //   if (channelLength) {
  //     this.setState({allMarkedRead: false});
  //   }
  // }

  return (
    <div className='contain-game-insights'>
      <MessagesListRenderProp
        curChannel={'feedback_messages'}
        messages={feedbackMessages}
        userId={`${wargameTitle}-${selectedForce}-${selectedRole}`}
        allMarkedRead={allMarkedRead}
        render={(messages: MessageFeedback[]) => (
          <MessagesListInsightsChannel
            messages={messages}
            markAllAsRead={markAllAsRead}
          />
        )}
      />
    </div>
  )
}

export default InsightsChannel
