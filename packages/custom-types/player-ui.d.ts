import ChannelData from './channel-data'
import ForceData from './force-data'
import PlatformTypeData from './platform-type-data'
import PlayerUiMessageTypes from './player-ui-message'

export interface PlayerUiChannels {
  [property: string]: ChannelData
}

export interface PlayerUiChatChannel {
  name: string,
  template: object,
  messages: Array<PlayerUiMessageTypes>
}

export default interface PlayerUi {
  selectedForce: string,
  forceColor: string,
  selectedRole: string,
  isObserver: boolean,
  canSubmitPlans: boolean,
  controlUi: boolean,
  currentTurn: number,
  phase: string,
  gameDate: string,
  gameTurnTime: number,
  realtimeTurnTime: number,
  turnEndTime: string,
  adjudicationStartTime: number,
  gameDescription: string,
  currentWargame: string,
  wargameTitle: string,
  chatChannel: PlayerUiChatChannel,
  channels: PlayerUiChannels,
  allChannels: Array<ChannelData>,
  allForces: Array<ForceData>,
  allTemplates: Array<any>,
  allPlatformTypes: Array<PlatformTypeData>,
  showObjective: boolean,
  wargameInitiated: boolean,
  feedbackMessages: Array<PlayerUiMessageTypes>,
  tourIsOpen: boolean,
  modalOpened?: string,
  showAccessCodes: boolean,
  isInsightViewer: boolean
}
