import { ForceData, TemplateBody } from 'src/custom-types'
import { Item } from '../../molecules/sortable-list'
import AdminLayoutProps from '../../../organisms/admin-layout/types/props'
import { ChannelTypes } from '../../../organisms/setting-channels'
import { MessageTemplate } from '../../../organisms/setting-channels/types/props'
import { WargameOverview } from '../../../organisms/setting-overview'
export default interface Props extends AdminLayoutProps {
  /**
   * Game overview, retrieved from database
   */
  overview: WargameOverview
  /**
   * Forces, retrieved from database
   */
  forces: Array<ForceData>
  /**
   * Channels, retrieved from database
   */
  channels: Array<ChannelTypes>
  /**
   * Callback on overview setting change events
   */
  onOverviewChange: (overview: WargameOverview) => void
  /**
   * Callback on forces setting change events
   */
  onForcesChange: (updates: { forces: Array<ForceData> }) => void
  /**
   * Callback on forces Add button click events
   */
  onCreateForce?: () => void
  /**
   * Callback on forces delete button click events
   */
  onDeleteForce?: (data: ForceData) => void
  /**
   * Callback on forces duplicate button click events
   */
  onDuplicateForce?: (item: ForceData) => void
  /**
   * Callback on forces' sidebar click events
   */
  onSidebarForcesClick?: (force: ForceData) => void
  /**
   * Selected force to indicate which force should be active
   * in forces setting tab
   */
  selectedForce?: ForceData
  /**
   * Callback on channels setting change events
   */
  onChannelsChange: (updates: { channels: Array<ChannelTypes>, selectedChannel: ChannelTypes }) => void
  /**
   * Callback on channel' sidebar click events
   */
  onSidebarChannelsClick?: (channel: ChannelTypes) => void
  /**
   * Callback on channels Add button click events
   */
  onCreateChannel?: (name: string, channel: ChannelTypes) => void
  /**
   * Callback on channels delete button click events
   */
  onDeleteChannel?: (data: ChannelTypes) => void
  /**
   * Callback on channels delete button click events
   */
  /**
   * Callback on template Add button click events
  */
  onCreateTemplate?: (template: TemplateBody) => void
  /**
    * Callback on template delete button click events
  */
  onDeleteTemplate?: () => void

  onDuplicateTemplate?: () => void
  /**
   * Callback on template setting change events
  */
  onTemplateChange: (updates: { templates: TemplateBody[] }) => void
  /**
    * Selected template to indicate which template should be active
    * in templates setting tab
  */
  selectedTemplate?: TemplateBody
  /**
   * Callback on template' sidebar click events
  */
  onSidebarTemplatesClick?: (template: TemplateBody) => voi
  onDuplicateChannel?: (item: ChannelTypes) => void
  /**
   * Selected channel to indicate which channel should be active
   * in template setting tab
   */
  selectedChannel?: ChannelTypes
  /**
   * Callback on each of the game setup tab save events
   */
  onSave: (updates: any) => void
  /**
   * Message templates to be shown on channel setting
   */
  templates: Array<MessageTemplate>
  /**
   * Handle game title save event
   */
  onSaveGameTitle?: (update: string) => void
  /**
   * Handle wargame title change event
   */
  onChangeWargameTitle?: (update: string) => void
  /**
   * Handle wargame being initiated
   */
  onWargameInitiate: () => void

  /**
   * Handle back button event
   */
  iconUploadUrl?: string
  onPressBack?: (e) => void
  /**
   * Handler for when user tries to delete role with Game Control privileges
   */
  customDeleteHandler?: (NewItems: Item[], key: number, handleChange: (changedItems: Item[]) => void) => void

}
