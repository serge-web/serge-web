import ForcesInChannelProps from '../../../molecules/forces-in-channel/types/props'
import { ChannelPlanning, ForceData, MessagePlanning } from '@serge/custom-types'

export type AdjudicationRow = {
  id: string
  title: string
  role: string
  activity: string
  period: string
}

export default interface PropTypes extends Omit<ForcesInChannelProps, 'icons' | 'names' | 'colors'> {
  /**
   * The list of channel messages properties required
   * for ChannelMessage components
   */
  messages: Array<MessagePlanning>
  /** forces in this game
   *
   */
  forces: ForceData[]
  /**
   *  current game-date (may be used in JSON Editor for date-picker)
   */
  gameDate: string
  /**
   *  definition of planning channel
   */
  channel: ChannelPlanning
  /**
   * template for providing feedback
   */
  template: TemplateBody
  /**
   * Callback on expanding message item
   */
  onRead?: { (message: MessagePlanning, count?: number): void }

  /**
   * handle unread message
   */
  onUnread?: (message: MessagePlanning) => void

  /**
   * force for player
   */
  playerForceId: ForceData['uniqid']
  /**
   * role of current player
   */
  playerRoleId: Role['roleId']

  /** how to render the game turn  */
  turnPresentation?: TurnFormats

  isUmpire: boolean
  /** whether to hide the forces in the channel
   */
  hideForcesInChannel: boolean
  /**
   * method to customise the new (or existing) message template
   */
  customiseTemplate?: { (schema: Record<string, any>): Record<string, any> }
  /**
   *  select an item on the map
   */
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>
  /** forces and colors
   *
   */
  forceColors: ForceStyle[]
}
