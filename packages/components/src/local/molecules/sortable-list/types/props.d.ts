import { ReactNode, ReactText } from 'react'

export interface ItemObject {
  name: string
  uniqid?: string | number
  [property: string]: any
}

export type Item = number | string | ItemObject

export interface SortableItem {
  /** The unique id associated with your item. It's recommended this is the same as the key prop for your list item. */
  id: ReactText
  /** When true, the item is selected using MultiDrag */
  selected?: boolean
  /** When true, the item is deemed "chosen", which basically just a mousedown event. */
  chosen?: boolean
  /** When true, it will not be possible to pick this item up in the list. */
  filtered?: boolean
  item: Item
  [property: string]: any
}

export default interface PropTypes {
  items: Array<Item>
  onClick?: (item: Item, key: number, e?: any) => void
  onChange?: (items: Array<Item>) => void
  onCreate?: () => void
  renderItemSection?: (items: Item, key: number) => ReactNode
  title?: string
  copy?: boolean
  remove?: boolean
  sortable?: 'manual' | 'auto'
  required?: boolean
  valueOnEmpty?: ReactText
  /** If this role is `Game Control` - a role which cannot be deleted */
  onRoleDelete?: (role: Role) => void
}
