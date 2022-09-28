import { AssetRow } from '../../planning-assets/types/props'

export default interface PropTypes {
  assets: AssetRow[]
  /** TEMPORARY flag used to provide styling for op for icons
   * Will not be necessary once we have PHASE-2 icons
   */
  opFor: boolean
  /** id of selected asset */
  selectedItem?: string | undefined
}
