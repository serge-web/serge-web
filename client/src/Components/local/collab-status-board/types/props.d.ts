import {
  ChannelCollab,
  ForceData,
  ForceRole,
  MessageCustom,
  TemplateBodysByKey,
  TypeOfCustomMessage
} from 'src/custom-types'

export type CollabStatusBoardProps = {
  currentWargame: string
  messages: MessageCustom[]
  channelColb: ChannelCollab
  /** current game phase */
  phase: Phase 
  onChange: (nextMessage: MessageCustom, messageType: TypeOfCustomMessage) => void
  /** if this player is from an umpire force (and can see private messages) */
  isUmpire: boolean
  /** if this player is an Observer, with read only access to messages */
  isObserver: boolean
  /** role of logged in player */
  role: ForceRole
  templates: TemplateBodysByKey
  expandedRowId?: string
  /** list of forces */
  forces: ForceData[]
  /** current game time, used for initialising date-time controls */
  gameDate: string
  /** fires on change message status to readed **/
  onMessageRead?: (message: MessageCustom) => void
  /** fires when player marks message as unread **/
  handleUnreadMessage?: (message: MessageCustom) => void
  /** mark all message as read */
  onMarkAllAsRead?: () => void
  /** mark message unread */
  onMarkAllAsUnRead?: () => void
  collabActivity: (getRoleId: string, activityType: string) => void
}
