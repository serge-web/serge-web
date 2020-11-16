import AdminLayoutProps from '../../../organisms/admin-layout/types/props'
import { WargameOverview } from '../../../organisms/setting-overview'
import { PlatformType } from '../../../organisms/setting-platform-types'
import { ForceData } from '../../../organisms/setting-forces'
import { ChannelData } from '../../../organisms/setting-channels'
import { MessageTemplate } from '../../../organisms/setting-channels/types/props'

export default interface Props extends AdminLayoutProps {
  /**
   * Game overview, retrieved from database
   */
  overview: WargameOverview
  /**
   * Platform types, retrieved from database
   */
  platformTypes?: PlatformType
  /**
   * Forces, retrieved from database
   */
  forces: Array<ForceData>
  /**
   * Channels, retrieved from database
   */
  channels: Array<ChannelData>
  /**
   * Callback on overview setting change events
   */
  onOverviewChange: (overview: WargameOverview) => void
  /**
   * Callback on platform types setting change events
   */
  onPlatformTypesChange: (platformType: PlatformType) => void
  /**
   * Callback on forces setting change events
   */
  onForcesChange: (forces: ForceData[]) => void
  /**
   * Callback on channels setting change events
   */
  onChannelsChange: (channels: ChannelData[]) => void
  /**
   * Callback on each of the game setup tab save events
   */
  onSave: (updates: any) => void
  /**
   * Message templates to be shown on channel setting
   */
  messageTemplates: Array<MessageTemplate>
}
