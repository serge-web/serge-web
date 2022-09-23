import { INFO_MESSAGE_CLIPPED } from '@serge/config'
import { Asset, CoreMessage, MessagePlanning, PlainInteraction } from '@serge/custom-types'
import { findAsset } from '@serge/helpers'
import cx from 'classnames'
import { LatLngBounds, LatLngExpression, latLngBounds } from 'leaflet'
import React, { useEffect, useState } from 'react'
import SupportMapping from '../support-mapping'
import SupportPanel from '../support-panel'
import styles from './styles.module.scss'
import PropTypes from './types/props'

export const PlanningChannel: React.FC<PropTypes> = ({
  dispatch,
  reduxDispatch,
  getAllWargameMessages,
  markUnread,
  markAllAsRead,
  saveNewActivityTimeMessage,
  openMessage,
  saveMessage,
  templates,
  messages,
  channel,
  selectedRoleId,
  selectedRoleName,
  currentWargame,
  selectedForce,
  isUmpire,
  allForces,
  platformTypes,
  gameDate,
  currentTurn
}) => {
  const [channelTabClass, setChannelTabClass] = useState<string>('')
  const [position, setPosition] = useState<LatLngExpression | undefined>(undefined)
  const [zoom] = useState<number>(12)
  const [bounds] = useState<LatLngBounds | undefined>(latLngBounds([[ -1.484, 150.1536],[ -21.941, 116.4863]]))

  // handle selections from asset tables
  const [selectedItem, setSelectedItem] = useState<Asset['uniqid'] | undefined>(undefined)

  useEffect(() => {
    if (selectedItem) {
      const asset = findAsset(allForces, selectedItem)
      const location = asset.location
      if (location) {
        setPosition(location)
      }
    } 
  }, [selectedItem])

  useEffect(() => {
    const channelClassName = channel.name.toLowerCase().replace(/ /g, '-')
    if (messages.length === 0) {
      getAllWargameMessages(currentWargame)(dispatch)
    }
    setChannelTabClass(`tab-content-${channelClassName}`)
  }, [])

  const onReadAll = (): void => {
    dispatch(markAllAsRead(channel.uniqid))
  }

  // drop the turn markers
  const planningMessages = messages.filter((msg: CoreMessage) => msg.messageType !== INFO_MESSAGE_CLIPPED)

  const onRead = (detail: MessagePlanning): void => {
    dispatch(openMessage(channel.uniqid, detail as any as MessageChannel))
  }

  const onUnread = (message: MessagePlanning): void => {
    if (message._id) {
      message.hasBeenRead = false
    }
    dispatch(markUnread(channel.uniqid, message as any as MessageChannel))
  }

  const newActiveMessage = (roleId: string, activityMessage: string): void => {
    // we don't have a message id at this point, player has only opened empty template
    const newMessage: PlainInteraction = {
      aType: activityMessage
    }
    saveNewActivityTimeMessage(roleId, newMessage, currentWargame)(reduxDispatch)
  }

  console.log('planning channel', selectedItem)

  return (
    <div className={cx(channelTabClass, styles.root)} data-channel-id={channel.uniqid}>
      <SupportPanel
        channel={channel}
        platformTypes={platformTypes}
        messages={planningMessages}
        onReadAll={onReadAll}
        onUnread={onUnread}
        onRead={onRead}
        templates={templates}
        activityTimeChanel={newActiveMessage}
        saveMessage={saveMessage}
        saveNewActivityTimeMessage={saveNewActivityTimeMessage}
        dispatch={reduxDispatch}
        currentWargame={currentWargame}
        isUmpire={isUmpire}
        selectedRoleName={selectedRoleName}
        selectedRoleId={selectedRoleId}
        selectedForce={selectedForce}
        allForces={allForces}
        gameDate={gameDate}
        currentTurn={currentTurn}
        setSelectedItem={setSelectedItem}
        selectedItem={selectedItem}
      />
      <SupportMapping bounds={bounds} zoom={zoom} position={position} />
    </div>
  )
}

export default PlanningChannel
