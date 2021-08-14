import { MessageCustom, ChannelData, ForceRole } from '@serge/custom-types'
import { CollaborativeMessageStates, SpecialChannelTypes } from '@serge/config'

export const formEditable = (message: MessageCustom, _role: ForceRole, _isUmpire = false, _isRFIManager: boolean): boolean => {
  const { collaboration } = message.details
  return typeof collaboration !== 'undefined' && collaboration.status === CollaborativeMessageStates.InProgress && _isUmpire && collaboration.owner?.roleId === _role.roleId && _isUmpire
}

// Collaborative Editing buttons
export const ColEditRelManDocPend = (message: MessageCustom, channels: ChannelData, canReleaseMessages: boolean | undefined): boolean => {
  const { collaboration } = message.details
  return channels.format === SpecialChannelTypes.CHANNEL_COLLAB_EDIT && typeof collaboration !== 'undefined' && collaboration.status === CollaborativeMessageStates.DocumentPending && !!canReleaseMessages
}

export const ColEditRelManReview = (message: MessageCustom, channels: ChannelData, canReleaseMessages: boolean | undefined): boolean => {
  const { collaboration } = message.details
  return channels.format === SpecialChannelTypes.CHANNEL_COLLAB_EDIT && typeof collaboration !== 'undefined' && collaboration.status === CollaborativeMessageStates.PendingReview && !!canReleaseMessages
}

export const ColEditCollPartAssClaim = (message: MessageCustom, channels: ChannelData, canCollaborate: boolean | undefined): boolean => {
  const { collaboration } = message.details
  return channels.format === SpecialChannelTypes.CHANNEL_COLLAB_EDIT && typeof collaboration !== 'undefined' && collaboration.status === CollaborativeMessageStates.DocumentPending && !!canCollaborate
}

export const ColEditCollPartEditDoc = (message: MessageCustom, channels: ChannelData, canCollaborate: boolean | undefined): boolean => {
  const { collaboration } = message.details
  return channels.format === SpecialChannelTypes.CHANNEL_COLLAB_EDIT && typeof collaboration !== 'undefined' && collaboration.status === CollaborativeMessageStates.EditDocument && !!canCollaborate
}

// Collaborative Responding buttons
export const ColRespRelManReview = (message: MessageCustom, channels: ChannelData, canReleaseMessages: boolean | undefined): boolean => {
  const { collaboration } = message.details
  return channels.format === SpecialChannelTypes.CHANNEL_COLLAB_RESPONSE && typeof collaboration !== 'undefined' && collaboration.status === CollaborativeMessageStates.PendingReview && !!canReleaseMessages
}

export const ColRespRelManRespPen = (message: MessageCustom, channels: ChannelData, canCollaborate: boolean | undefined): boolean => {
  const { collaboration } = message.details
  return channels.format === SpecialChannelTypes.CHANNEL_COLLAB_RESPONSE && typeof collaboration !== 'undefined' && collaboration.status === CollaborativeMessageStates.ResponsePending && !!canCollaborate
}

export const ColRespRelManEditResp = (message: MessageCustom, channels: ChannelData, canCollaborate: boolean | undefined): boolean => {
  const { collaboration } = message.details
  return channels.format === SpecialChannelTypes.CHANNEL_COLLAB_RESPONSE && typeof collaboration !== 'undefined' && collaboration.status === CollaborativeMessageStates.EditResponse && !!canCollaborate
}