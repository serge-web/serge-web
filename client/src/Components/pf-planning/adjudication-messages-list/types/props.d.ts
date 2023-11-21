import { Phase } from 'src/config'
import {
  ChannelPlanning, ForceData, GameTurnLength, InteractionDetails, MessageAdjudicationOutcomes, MessageDetails, MessagePlanning, MessageStructure,
  PerForcePlanningActivitySet, PlatformTypeData, Role, TemplateBody, TurnPeriods
} from 'src/custom-types'
import { MessageInteraction } from 'src/custom-types/message'
import { ForceStyle } from 'src/Helpers'
import ForcesInChannelProps from '../../../molecules/forces-in-channel/types/props'
import { AdjudicationPostBack } from '../../planning-channel/types/props'

export type AdjudicationRow = {
  id: string
  reference: string
  complete: boolean
  /** turn when adjudication generated */
  turn: number
  /** whether outcome is flagged as important */
  important: string
  owner: string
  order1: string
  order2: string
  activity: string
  period: string
  tableData?: { showDetailPanel: any }
}

export default interface PropTypes extends Omit<ForcesInChannelProps, 'icons' | 'names' | 'colors'> {
  /**
   * The list of channel messages properties required
   * for ChannelMessage components
   */
  interactionMessages: Array<MessageInteraction>
  /**
   * The list of channel messages properties required
   * for ChannelMessage components
   */
  turnPlanningMessages: Array<MessagePlanning>
  /**
   * The list of channel messages properties required
   * for ChannelMessage components
   */
  allPlanningMessages: Array<MessagePlanning>
  /** forces in this game
  *
  */
  forces: ForceData[]
  /**
   *  current game-date (may be used in JSON Editor for date-picker)
   */

  /**
   * all the turn periods of the wargame
   */
  periods: TurnPeriods

  gameDate: string
  /**
   *  the turn length
   */
  gameTurnLength: GameTurnLength
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

  currentWargame: string
   /**
   * the name of the wargame
   */

  onRead?: { (message: MessagePlanning, count?: number): void }

  /**
   * handle unread message
   */
  onUnread?: (message: MessagePlanning) => void
  /**
   * role of current player
   */
  playerRoleId: Role['roleId']
  /**
   * method to customise the new (or existing) message template
   */
  customiseTemplate?: { (document: MessageStructure | undefined, schema: Record<string, any>): Record<string, any> }
  /** forces and colors
   *
   */
  forceColors: ForceStyle[]
  /**
   * the range of planning activities for each force
   */
  forcePlanningActivities?: PerForcePlanningActivitySet[]
  /**
   * there is a new interaction to adjudicate
   */
  handleAdjudication: { (details: InteractionDetails, outcomes: MessageAdjudicationOutcomes): void }
  /**
   * current turn filter (or -1 to show all turns)
   */
  turnFilter?: number
  /** descriptions of platform types (used for perception drop-down) */
  platformTypes: PlatformTypeData[]

  onDetailPanelOpen?: (rowData: AdjudicationRow) => void

  onDetailPanelClose?: (rowData: AdjudicationRow) => void

  postBack?: { (details: MessageDetails, message: any): void }

  /**
   * The method for posting messages out of the mapping components. They have
   * special handlers since the message may involve making changes to the forces
   * in the wargame
   */
  mapPostBack?: AdjudicationPostBack

  onLocationEditorLoaded?: (editorElm: HTMLDivElement) => void

  /** the current turn for the game */
  currentTurn: number

  /** current phase of game */
  phase: Phase
}